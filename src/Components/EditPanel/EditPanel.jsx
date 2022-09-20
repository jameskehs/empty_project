import "./EditPanel.css";
import { useEffect, useState, createContext, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isLoggedInContext } from "../Site/Site";
import axios from "axios";
import { isTemplateElement } from "@babel/types";
import Select from "react-select";

let currFocusedComponentID = "";
let currSelectedComponentID = "";

let isHidden = false;

export function AttemptFocus(componentID) {
  if (currSelectedComponentID === "" || currSelectedComponentID === "empty") {
    currFocusedComponentID = componentID;
    console.log("Focused component: " + componentID);
    return true;
  } else {
    return false;
  }
}
export function RemoveFocus(componentID) {
  if (currFocusedComponentID === componentID) {
    currFocusedComponentID = "";
    console.log("Unfocused component: " + componentID);
  }
}

export function AttemptSelection(componentID) {
  var selectionAllowed =
    currSelectedComponentID === "" ||
    currSelectedComponentID === "empty" ||
    currSelectedComponentID === componentID;

  if (selectionAllowed) {
    console.log("Selected component: " + componentID);
    currSelectedComponentID = componentID;
    return true;
  } else {
    return false;
  }
}

export function ToggleHidenEditPanel(status) {
  console.log("Edit Panel hiddens status: " + status);
  isHidden = status;
}

export async function CommitChangesToDB(moduleID, module, sortOrder) {
  try {
    const { data } = await axios.put(`/api/modules/${moduleID}`, {
      module,
      sortOrder,
    });
  } catch (error) {
    console.error(error);
  }
}

function FinishEditingComponent(isSave, props) {
  console.log("Finished editing component: " + currSelectedComponentID);
  currSelectedComponentID = "";
  currFocusedComponentID = "";
  var realProps = {};
  realProps.props = props;
  console.error(props);
  realProps.componentName = props.componentName;
  if (isSave) {
    CommitChangesToDB(
      realProps.props.UID,
      realProps,
      realProps.props.sortorder
    );
  }
}

const EditPanel = (props) => {
  const { isLoggedIn } = useContext(isLoggedInContext);

  function ShowComponentProperties() {
    console.log("Filling out edit panel with component: " + props.componentID);

    //These are used for empty component only
    const defaultList = ["A", "B", "C", "D", "E"];
    const [itemList, setItemList] = useState(defaultList);

    const actionsForButtons = [
      { label: "Go to Hero", value: "#Hero" },
      { label: "Go to Collection", value: "#Collection" },
    ];

    switch (props.componentName) {
      case "Hero":
        {
          const {
            title,
            setTitle,
            body,
            setBody,
            imgSrc,
            setImgSrc,
            buttons,
            setButtons,
            DiscardValues,
            SaveValues,
          } = props;

          return (
            <>
              <div className="EditPanel">
                <h1>Hero</h1>
                <br></br>
                <>{GenericTextField("Title", "Title", title, setTitle)}</>
                <br></br>
                <>{GenericTextField("Body", "Body", body, setBody)}</>
                <br></br>
                <>{ImageUpload("Picture", "heroPic", imgSrc, setImgSrc)}</>
                <br></br>
                <>
                  {console.error(buttons)}
                  {ItemGroup(
                    "actionButtons",
                    buttons,
                    setButtons,
                    actionsForButtons,
                    0,
                    2
                  )}
                </>
                <br></br>
                <>{SaveAndDiscardButtons(SaveValues, DiscardValues)}</>
              </div>
            </>
          );
        }
        break;
      case "Collection":
        {
          const { Title, setTitle, Desc, setDesc, DiscardValues, SaveValues } =
            props;
          return (
            <div className="EditPanel">
              <h1>Collection</h1>
              <br></br>
              <>{GenericTextField("Title", "Title", Title, setTitle)}</>
              <br></br>
              <>{GenericTextField("Description", "Desc", Desc, setDesc)}</>
              <br></br>
              <>{SaveAndDiscardButtons(SaveValues, DiscardValues)}</>
            </div>
          );
        }
        break;
      case "Contact":
        {
          const { email, phone, address } = props;
          return (
            <div className="EditPanel">
              <h1>Contact</h1>
              <br></br>
              <></>
            </div>
          );
        }
        break;
      case "Gallery":
        {
          const {
            Title,
            setTitle,
            Images,
            setImages,
            SaveValues,
            DiscardValues,
          } = props;
          return (
            <div className="EditPanel">
              <h1>Gallery</h1>
              <br></br>
              <>{GenericTextField("Title", "Title", Title, setTitle)}</>
              <br></br>
              <>{SaveAndDiscardButtons(SaveValues, DiscardValues)}</>
            </div>
          );
        }
        break;
      case "empty":
        {
          const handleDrop = (droppedItem) => {
            // Ignore drop outside droppable container
            if (!droppedItem.destination) return;
            var updatedList = [...itemList];
            // Remove dragged item
            const [reorderedItem] = updatedList.splice(
              droppedItem.source.index,
              1
            );
            // Add dropped item
            updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
            // Update State
            setItemList(updatedList);
          };

          return (
            <div className="EditPanelAddModules">
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {itemList.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided) => (
                            <div
                              className="item-container"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          );
        }
        break;
      default: {
        return "";
      }
    }
  }

  function SaveAndDiscardButtons(onSave, onDiscard) {
    return (
      <>
        <button
          onClick={() => {
            onSave();
            FinishEditingComponent(true, props);
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            onDiscard();
            FinishEditingComponent(false, props);
          }}
        >
          Discard
        </button>
      </>
    );
  }
  //Creates a simple text field and label for string value
  function GenericTextField(visualName, id, currValue, onChange) {
    return (
      <>
        <label htmlFor={id}>{visualName}</label>
        <input
          id={id}
          value={currValue}
          type="Text"
          placeholder={visualName}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </>
    );
  }

  //Creates a simple image upload field
  function ImageUpload(visualName, id, imgSrc, onChange) {
    return (
      <>
        <p>{visualName}</p>
        <label for={id}>{imgSrc}</label>
        <input
          type="file"
          name={id}
          onChange={(event) => {
            console.log(event.target.files[0]);
            onChange("/assets/" + event.target.files[0].name);
          }}
          accept=".jpg,.jpeg,.png"
        ></input>
      </>
    );
  }

  //Creates a simple image upload field with subtext
  function ImageUploadWithSubtext(
    visualName,
    id,
    imgSrc,
    onChange,
    subText,
    setSubText
  ) {
    return (
      <>
        <>{ImageUpload(visualName, id, imgSrc, onChange)}</>
        <>{GenericTextField("SubText", "subText", subText, setSubText)}</>
      </>
    );
  }

  //Creates a select box
  function Selector(id, options, initialOption, onChange) {
    const initOption = { value: initialOption.value };
    for (var i = 0; i < options.length; i++) {
      console.error(options[i].label);
      if (options[i].value == initialOption.value) {
        initOption.label = options[i].label;
      }
    }

    const [selection, setSelection] = useState(initOption);
    useEffect(() => {
      onChange(selection);
    }, [selection]);
    return (
      <>
        <Select
          name=""
          id={id}
          value={selection}
          options={options}
          onChange={setSelection}
        />
      </>
    );
  }

  //Combines a selector for the action and a text field for the label to make a button on the website
  function ActionButton(
    idAction,
    actionOptions,
    initialActionOption,
    onChangeAction,
    visualNameLabel,
    idLabel,
    currValueLabel,
    onChangeLabel
  ) {
    return (
      <>
        {Selector(idAction, actionOptions, initialActionOption, onChangeAction)}
        {GenericTextField(
          visualNameLabel,
          idLabel,
          currValueLabel,
          onChangeLabel
        )}
      </>
    );
  }

  //Creates a group of managed identical items
  function ItemGroup(itemType, dataSet, setDataSet, actionSet, min, max) {
    switch (itemType) {
      case "actionButtons":
        var itemSet = [];
        for (let i = 0; i < dataSet.length; i++) {
          itemSet[i] = (
            <>
              {ActionButton(
                "action",
                actionSet,
                dataSet[i],
                (val) => {
                  console.error(i);
                  if (val !== undefined && i < dataSet.length) {
                    var newButtons = [];
                    for (var j = 0; j < dataSet.length; j++) {
                      newButtons[j] = dataSet[j];
                    }
                    newButtons[i].value = val.value;
                    setDataSet(newButtons);
                  }
                },
                "Label:",
                "label",
                dataSet[i].label,
                (val) => {
                  console.error(i);
                  if (val !== undefined && i < dataSet.length) {
                    var newButtons = [];
                    for (var j = 0; j < dataSet.length; j++) {
                      newButtons[j] = dataSet[j];
                    }
                    newButtons[i].label = val;
                    setDataSet(newButtons);
                  }
                }
              )}
            </>
          );
        }
        return itemSet;
        break;
    }
  }

  return (
    <>
      {isLoggedIn && (
        <div className="sidenav" hidden={isHidden}>
          <h1>Edit Panel</h1>
          <p>Welcome! Make changes to your website here!</p>
          <br></br>
          <hr></hr>
          <br></br>
          {ShowComponentProperties()}
          <br></br>
          <hr></hr>
          <br></br>
          <p>Global options</p>
        </div>
      )}
    </>
  );
};

export default EditPanel;

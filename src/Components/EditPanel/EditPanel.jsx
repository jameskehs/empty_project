import "./EditPanel.css";
import { useEffect, useState, createContext, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

var currFocusedComponentID = "";
var currSelectedComponentID = "";

var isHidden = false;

export function AttemptFocus(componentID) {
  if (currSelectedComponentID == "" || currSelectedComponentID == "empty") {
    currFocusedComponentID = componentID;
    console.log("Focused component: " + componentID);
    return true;
  } else {
    return false;
  }
}
export function RemoveFocus(componentID) {
  if (currFocusedComponentID == componentID) {
    currFocusedComponentID = "";
    console.log("Unfocused component: " + componentID);
  }
}

export function AttemptSelection(componentID) {
  var selectionAllowed =
    currSelectedComponentID == "" ||
    currSelectedComponentID == "empty" ||
    currSelectedComponentID == componentID;

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

function FinishEditingComponent() {
  console.log("Finished editing component: " + currSelectedComponentID);
  currSelectedComponentID = "";
  currFocusedComponentID = "";
}

const EditPanel = (props) => {
  function ShowComponentProperties() {
    console.log("Filling out edit panel with component: " + props.componentID);

    //These are used for empty component only
    const defaultList = ["A", "B", "C", "D", "E"];
    const [itemList, setItemList] = useState(defaultList);

    switch (props.componentName) {
      case "Hero":
        {
          const {
            Title,
            setTitle,
            Body,
            setBody,
            ImgSrc,
            setImgSrc,
            DiscardValues,
            SaveValues,
          } = props;

          return (
            <>
              <div className="EditPanel">
                <h1>Hero</h1>
                <br></br>
                <>{GenericTextField("Title", "Title", Title, setTitle)}</>
                <br></br>
                <>{GenericTextField("Body", "Body", Body, setBody)}</>
                <br></br>
                <>{ImageUpload("Picture", "heroPic", ImgSrc, setImgSrc)}</>
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
    }
  }

  function SaveAndDiscardButtons(onSave, onDiscard) {
    return (
      <>
        <button
          onClick={() => {
            onSave();
            FinishEditingComponent();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            onDiscard();
            FinishEditingComponent();
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
        <label for={id}>{visualName}</label>
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

  return (
    <>
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
    </>
  );
};

export default EditPanel;

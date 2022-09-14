import "./EditPanel.css";
import { useEffect, useState, createContext, useContext } from "react";
import { SetEditPanelProps } from "../Site/Site";

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
    switch (props.componentName) {
      case "Hero":
        {
          const { Title, setTitle, Body, setBody, DiscardValues, SaveValues } =
            props;
          return (
            <div className="EditPanel">
              <h1>Hero</h1>
              <br></br>
              <>{GenericTextField("Title", "Title", Title, setTitle)}</>
              <br></br>
              <>{GenericTextField("Body", "Body", Body, setBody)}</>
              <br></br>
              <>{SaveAndDiscardButtons(SaveValues, DiscardValues)}</>
            </div>
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
          const { Title, imagePairs } = props;
          return (
            <div className="EditPanel">
              <p>
                Select an existing website component to edit or Add a website
                component below
              </p>
              <br></br>
              <label for="addComponents">Add a component:</label>

              <select name="addComponents" id="addComponents">
                <option value="Hero">Hero</option>
                <option value="Collection">Collection</option>
                <option value="Contact">Contact</option>
                <option value="Gallery">Gallery</option>
              </select>
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

import "./EditPanel.css";
import { useEffect, useState } from "react";

var currFocusedComponent = "";
var currSelectedComponent = "";
var currSelectedProps = null;

const EditPanel = (props) => {
  function HandleFocusAndSelection() {
    //Handle focus
    if (props.isAttemptingFocus) {
      if (currSelectedComponent == "") {
        currFocusedComponent = props.componentID;
        props.setIsFocused(true);
      } else {
        props.setIsFocused(false);
      }
    } else {
      props.setIsFocused(false);
    }

    //Handle selection
    if (props.isAttemptingSelection) {
      if (currSelectedComponent == "") {
        currSelectedComponent = props.componentID;
        currSelectedProps = props;
        currSelectedProps.setIsFocused(false);
        currSelectedProps.setIsSelected(true);
        currSelectedProps.setIsAttemptingSelection(false);
      } else if (currSelectedComponent == props.componentID) {
        //do nothing
        currSelectedProps.setIsAttemptingSelection(false);
      } else {
        props.setIsAttemptingSelection(false);
        currSelectedProps.setIsSelected(false);
      }
    }

    if (currSelectedProps == null) {
      props = { componentName: "empty", componentID: "empty" };
      currSelectedProps = props;
    }
  }

  function FinishEditingComponent() {
    currSelectedProps.setIsFocused(false);
    currSelectedProps.setIsSelected(false);
    currSelectedProps.setIsAttemptingSelection(false);
    currSelectedProps = null;
    currFocusedComponent = "";
    currSelectedComponent = "";
  }

  function ShowComponentProperties() {
    if (props.componentID != currSelectedProps.componentID) {
      props = currSelectedProps;
    }

    switch (props.componentName) {
      case "Hero":
        {
          const { Title, body, imgSrc, buttons } = props;
          return (
            <div className="EditPanel">
              <p>{Title}</p>
              <br></br>
              <></>
            </div>
          );
        }
        break;
      case "Collection":
        {
          const { Title, setTitle, Desc, setDesc, DiscardValues, SaveValues } = props;
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
          const { Title, imagePairs } = props;
          return (
            <div className="EditPanel">
              <p>{Title}</p>
              <br></br>
              <></>
            </div>
          );
        }
        break;
      case "empty":
        {
          const { Title, imagePairs } = props;
          return (
            <div className="EditPanel">
              <p>Select an existing website component to edit or Add a website component below</p>
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

  if (props.componentName == "hidden") {
    return;
  } else {
    return (
      <>
        {HandleFocusAndSelection()}
        <div className="sidenav">
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
  }
};

export default EditPanel;

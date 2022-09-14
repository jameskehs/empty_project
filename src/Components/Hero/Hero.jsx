import "./Hero.css";
import React, { useEffect, useRef, useState } from "react";
import EditPanel, { AttemptFocus, RemoveFocus, AttemptSelection, ToggleHidenEditPanel } from "../EditPanel/EditPanel";

const Hero = (props) => {
  console.log(props);
  //Module states
  const [Title, setTitle] = useState(props.title);
  const [Body, setBody] = useState(props.body);
  const [imgSrc, setImgSrc] = useState(props.imgSrc);
  const [buttons, setButtons] = useState(props.buttons);

  //Editing states
  const [editState, setEditState] = useState("none");

  function SaveValues() {
    setEditState("none");
  }
  function DiscardValues() {
    setEditState("none");
  }

  function GetClass() {
    if (editState == "selected") {
      return "selected";
    } else if (editState == "focused") {
      return "focused";
    } else {
      return "";
    }
  }
  ToggleHidenEditPanel(false);
  return (
    <>
      {editState == "selected" && (
        <EditPanel
          componentName="Hero"
          componentID="hero"
          Title={Title}
          setTitle={setTitle}
          Body={Body}
          setBody={setBody}
          SaveValues={SaveValues}
          DiscardValues={DiscardValues}
        />
      )}
      <div
        className={`hero ${GetClass()}`}
        onClick={() => {
          setEditState(AttemptSelection("hero") ? "selected" : editState);
        }}
        onMouseEnter={() => {
          setEditState(AttemptFocus("hero") ? "focused" : editState);
        }}
        onMouseLeave={() => {
          RemoveFocus();
          if (editState != "selected") {
            setEditState("none");
          }
        }}
      >
        <div className="hero-contents">
          <div>
            <h1>{Title}</h1>
            <p className="pOne">{Body}</p>
            <div className="hero-btn-container">
              {buttons !== undefined &&
                buttons.map((button) => {
                  return <button>{button.content}</button>;
                })}
            </div>
          </div>
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;

import "./Hero.css";
import React, { useEffect, useRef, useState } from "react";
import EditPanel, {
  AttemptFocus,
  RemoveFocus,
  AttemptSelection,
  ToggleHidenEditPanel,
} from "../EditPanel/EditPanel";

const Hero = ({ title, body, imgSrc, buttons }) => {
  //Module states
  const [Title, setTitle] = useState(title);
  const [Body, setBody] = useState(body);

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
      <div className={GetClass()}>
        <div
          id="hero"
          className="hero"
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
            <h2>{Title}</h2>
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

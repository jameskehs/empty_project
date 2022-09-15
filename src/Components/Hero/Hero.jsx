import "./Hero.css";
import React, { useEffect, useRef, useState, useContext } from "react";
import EditPanel, {
  AttemptFocus,
  RemoveFocus,
  AttemptSelection,
  ToggleHidenEditPanel,
} from "../EditPanel/EditPanel";
import { isLoggedInContext } from "../Site/Site";

const Hero = (props) => {
  //Module states
  const [Title, setTitle] = useState(props.title);
  const [Body, setBody] = useState(props.body);
  const [ImgSrc, setImgSrc] = useState(props.imgSrc);
  const [buttons, setButtons] = useState(props.buttons);

  //Editing states
  const [editState, setEditState] = useState("none");
  const { isLoggedIn } = useContext(isLoggedInContext);

  function SaveValues() {
    setEditState("none");
    console.error(props.UID);
    var module = {
      componentName: "Hero",
      props: {
        title: Title,
        body: Body,
        imgSrc: ImgSrc,
      },
    };
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
          ImgSrc={ImgSrc}
          setImgSrc={setImgSrc}
          SaveValues={SaveValues}
          DiscardValues={DiscardValues}
        />
      )}
      <div
        className={`hero ${GetClass()}`}
        onClick={() => {
          setEditState(
            isLoggedIn
              ? AttemptSelection("hero")
                ? "selected"
                : editState
              : "none"
          );
        }}
        onMouseEnter={() => {
          setEditState(
            isLoggedIn ? (AttemptFocus("hero") ? "focused" : editState) : "none"
          );
        }}
        onMouseLeave={() => {
          RemoveFocus();
          if (isLoggedIn && editState != "selected") {
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
          <img src={ImgSrc} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;

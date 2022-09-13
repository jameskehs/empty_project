import CollectionItem from "./CollectionItem";
import EditPanel, {
  AttemptFocus,
  RemoveFocus,
  AttemptSelection,
  ToggleHidenEditPanel,
} from "../EditPanel/EditPanel";
import "./Collection.css";
import React, { useEffect, useRef, useState, useContext } from "react";

const Collection = ({ title, desc, collectionItems }) => {
  //Module states
  const [Title, setTitle] = useState(title);
  const [Desc, setDesc] = useState(desc);

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
      return "collection-selected";
    } else if (editState == "focused") {
      return "collection-focused";
    } else {
      return "";
    }
  }

  ToggleHidenEditPanel(false);
  return (
    <>
      {editState == "selected" && (
        <EditPanel
          componentName="Collection"
          componentID="collection"
          Title={Title}
          setTitle={setTitle}
          Desc={Desc}
          setDesc={setDesc}
          SaveValues={SaveValues}
          DiscardValues={DiscardValues}
        />
      )}
      <div
        id="collection"
        className={GetClass()}
        onClick={() => {
          setEditState(AttemptSelection("collection") ? "selected" : editState);
        }}
        onMouseEnter={() => {
          setEditState(AttemptFocus("collection") ? "focused" : editState);
        }}
        onMouseLeave={() => {
          RemoveFocus();
          if (editState != "selected") {
            setEditState("none");
          }
        }}
      >
        <h3>{Title}</h3>
        <p>{Desc}</p>
        <div className="collection-item-container">
          {collectionItems.map((item, index) => {
            return <CollectionItem key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;

import CollectionItem from "./CollectionItem";
import EditPanel, { AttemptFocus, RemoveFocus, AttemptSelection, ToggleHidenEditPanel } from "../EditPanel/EditPanel";
import React, { useState } from "react";
import "./Collection.css";

const Collection = (props) => {
  //Module states
  const [Title, setTitle] = useState(props.title);
  const [Desc, setDesc] = useState(props.desc);
  const [CollectionItems, setCollectionItems] = useState(props.collectionItems);

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
        className={`collection ${GetClass()}`}
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
        <div className="collection-contents">
          <h2>{Title}</h2>
          <p className="pOne">{Desc}</p>
          <div className="collection-item-container">
            {CollectionItems.map((item, index) => {
              return <CollectionItem key={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

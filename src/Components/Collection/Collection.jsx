import CollectionItem from "./CollectionItem";
import EditPanel, {
  AttemptFocus,
  RemoveFocus,
  AttemptSelection,
  ToggleHidenEditPanel,
} from "../EditPanel/EditPanel";
import React, { useState, useContext } from "react";
import "./Collection.css";
import { isLoggedInContext } from "../Site/Site";

const Collection = (props) => {
  //Module states
  const [Title, setTitle] = useState(props.title);
  const [Desc, setDesc] = useState(props.desc);
  const [CollectionItems, setCollectionItems] = useState(props.collectionItems);

  //Editing states
  const [editState, setEditState] = useState("none");
  const { isLoggedIn } = useContext(isLoggedInContext);

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
          UID={props.UID}
          sortorder={props.sortorder}
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
          setEditState(
            isLoggedIn
              ? AttemptSelection("collection")
                ? "selected"
                : editState
              : "none"
          );
        }}
        onMouseEnter={() => {
          setEditState(
            isLoggedIn
              ? AttemptFocus("collection")
                ? "focused"
                : editState
              : "none"
          );
        }}
        onMouseLeave={() => {
          RemoveFocus();
          if (isLoggedIn && editState != "selected") {
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

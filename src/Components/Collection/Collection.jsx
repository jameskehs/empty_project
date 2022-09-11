import CollectionItem from "./CollectionItem";
import EditPanel from "../EditPanel/EditPanel";
import "./Collection.css";
import React, { useEffect, useRef, useState } from "react";

const Collection = ({ title, desc, collectionItems }) => {
  const [Title, setTitle] = useState(title);
  const [Desc, setDesc] = useState(desc);
  const [isAttemptingFocus, setIsAttemptingFocus] = useState(false);
  const [isAttemptingSelection, setIsAttemptingSelection] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  function SaveValues() {}
  function DiscardValues() {}

  function GetClass() {
    if (isSelected) {
      return "collection-selected";
    } else if (isFocused) {
      return "collection-focused";
    } else {
      return "collection";
    }
  }

  return (
    <>
      <EditPanel
        componentName="Collection"
        componentID="collection"
        Title={Title}
        setTitle={setTitle}
        Desc={Desc}
        setDesc={setDesc}
        DiscardValues={DiscardValues}
        SaveValues={SaveValues}
        isAttemptingFocus={isAttemptingFocus}
        isAttemptingSelection={isAttemptingSelection}
        setIsAttemptingSelection={setIsAttemptingSelection}
        setIsFocused={setIsFocused}
        setIsSelected={setIsSelected}
      />
      <div
        id="collection"
        className={GetClass()}
        onClick={() => {
          setIsAttemptingSelection(true);
        }}
        onMouseEnter={() => {
          setIsAttemptingFocus(true);
        }}
        onMouseLeave={() => {
          setIsAttemptingFocus(false);
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

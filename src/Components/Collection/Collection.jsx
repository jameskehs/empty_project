import CollectionItem from "./CollectionItem";
import "./Collection.css";
import React, { useState } from "react";

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
      <div
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
        <div className="collection-contents">
          <h2>{Title}</h2>
          <p className="pOne">{Desc}</p>
          <div className="collection-item-container">
            {collectionItems.map((item, index) => {
              return <CollectionItem key={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;

import CollectionItem from "./CollectionItem";
import EditPanel from "../EditPanel/EditPanel";
import "./Collection.css";
import React, { useEffect, useRef, useState } from "react";

const Collection = ({ title, desc, collectionItems }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cssClass, setCssClass] = useState("collection");

  const [Title, setTitle] = useState(title);
  const [Desc, setDesc] = useState(desc);

  useEffect(() => {
    ToggleFocus();
  }, [isEditing]);

  function ToggleFocus(status) {
    if (isEditing) {
      setCssClass("collection-editing");
    } else {
      setCssClass(status ? "collection-focused" : "collection");
    }
  }

  function SaveValues() {}

  return (
    <>
      {isEditable && (
        <EditPanel
          componentName="Collection"
          Title={Title}
          setTitle={setTitle}
          Desc={Desc}
          setDesc={setDesc}
          setIsEditing={setIsEditing}
          setIsEditable={setIsEditable}
          SaveValues={SaveValues}
        />
      )}
      {!isEditable && <EditPanel componentName="empty" />}
      <div
        className={cssClass}
        onClick={() => {
          setIsEditable(true);
          setIsEditing(true);
          ToggleFocus(true);
        }}
        onMouseEnter={() => ToggleFocus(true)}
        onMouseLeave={() => ToggleFocus(false)}
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

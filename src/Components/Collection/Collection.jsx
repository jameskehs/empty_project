import CollectionItem from "./CollectionItem";
import EditPanel from "../EditPanel/EditPanel";
import "./Collection.css";
import React, { useEffect, useRef, useState } from "react";

const Collection = ({ title, desc, collectionItems }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [Title, setTitle] = useState(title);
  const [Desc, setDesc] = useState(desc);

  return (
    <>
      {isEditable && (
        <EditPanel
          componentName="Collection"
          Title={Title}
          setTitle={setTitle}
          Desc={Desc}
          setDesc={setDesc}
        />
      )}
      <div className="collection" onClick={() => setIsEditable(true)}>
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

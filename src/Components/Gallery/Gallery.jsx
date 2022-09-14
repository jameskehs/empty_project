import "./Gallery.css";
import { useState } from "react";
import ImageOverlay from "./ImageOverlay";
import EditPanel, { AttemptFocus, RemoveFocus, AttemptSelection, ToggleHidenEditPanel } from "../EditPanel/EditPanel";

const Gallery = (props) => {
  console.log(props);
  const [title, setTitle] = useState(props.title);
  const [images, setImages] = useState(props.images);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  //Editing states
  const [editState, setEditState] = useState("none");

  function SaveValues() {
    setEditState("none");
  }
  function DiscardValues() {
    setEditState("none");
  }

  function GetClass() {
    if (editState === "selected") {
      return "selected";
    } else if (editState === "focused") {
      return "focused";
    } else {
      return "";
    }
  }

  ToggleHidenEditPanel(false);
  return (
    <>
      {editState === "selected" && (
        <EditPanel
          componentName="Gallery"
          componentID="gallery"
          Title={title}
          setTitle={setTitle}
          Images={images}
          setImages={setImages}
          SaveValues={SaveValues}
          DiscardValues={DiscardValues}
        />
      )}
      <div
        className={`gallery ${GetClass()}`}
        onClick={() => {
          setEditState(AttemptSelection("collection") ? "selected" : editState);
        }}
        onMouseEnter={() => {
          setEditState(AttemptFocus("collection") ? "focused" : editState);
        }}
        onMouseLeave={() => {
          RemoveFocus();
          if (editState !== "selected") {
            setEditState("none");
          }
        }}
      >
        {isOverlayOpen && (
          <ImageOverlay setIsOverlayOpen={setIsOverlayOpen} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} images={images} />
        )}
        <div className="gallery-contents">
          <h3>{title}</h3>
          <div className="gallery-img-container">
            {images.map((image, index) => {
              const { imgSrc, imgSubtitle } = image;
              return (
                <div className="gallery-img-pair" key={index}>
                  <img src={imgSrc} alt={imgSubtitle} />
                  <p>{imgSubtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;

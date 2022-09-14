import "./Gallery.css";
import { useState } from "react";
import ImageOverlay from "./ImageOverlay";

const Gallery = (props) => {
  console.log(props);
  const [title, setTitle] = useState(props.title);
  const [images, setImages] = useState(props.images);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  return (
    <div className="gallery">
      {isOverlayOpen && (
        <ImageOverlay setIsOverlayOpen={setIsOverlayOpen} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} images={images} />
      )}
      <h3>{title}</h3>
      <div className="gallery-img-container">
        {images.map((image, index) => {
          const { imgSrc, imgSubtitle } = image;
          return (
            <div
              className="gallery-img-pair"
              key={index}
              onClick={() => {
                setIsOverlayOpen(true);
                setSelectedIndex(index);
              }}
            >
              <img src={imgSrc} alt={imgSubtitle} />
              <p>{imgSubtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;

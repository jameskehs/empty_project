import "./Gallery.css";
import { useState } from "react";

const Gallery = (props) => {
  console.log(props);
  const [title, setTitle] = useState(props.title);
  const [images, setImages] = useState(props.images);

  return (
    <div className="gallery">
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
  );
};

export default Gallery;

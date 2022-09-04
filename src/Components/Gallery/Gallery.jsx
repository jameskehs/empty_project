import "./Gallery.css";

const Gallery = ({ title, imagePairs }) => {
  return (
    <div className="gallery">
      <h1>{title}</h1>
      {imagePairs.map((pair) => {
          <p>{pair.subtitle}</p>;
          <img src={pair.imgSrc} alt="" />;
        })}
    </div>
  );
};

export default Gallery;

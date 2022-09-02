import "./Gallery.css";

const Gallery = ({ title, imagePairs }) => {
  return (
    <div className="gallery">
      <h1>{title}</h1>
      {links.map((link) => {
          return <a href={link.href}>{link.content}</a>;
        })}
    </div>
  );
};

export default Gallery;

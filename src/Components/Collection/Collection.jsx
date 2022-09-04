import CollectionItem from "./CollectionItem";
import "./Collection.css";
const Collection = ({ title, desc, collectionItems }) => {
  return (
    <div className="collection">
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="collection-item-container">
        {collectionItems.map((item, index) => {
          return <CollectionItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Collection;

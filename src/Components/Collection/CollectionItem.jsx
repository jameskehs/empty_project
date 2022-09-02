const CollectionItem = ({ imgSrc, itemTitle, itemDesc }) => {
  return (
    <div>
      <img src={imgSrc} alt="" />
      <h4>{itemTitle}</h4>
      <p>{itemDesc}</p>
    </div>
  );
};

export default CollectionItem;

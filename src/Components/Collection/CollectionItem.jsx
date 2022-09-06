const CollectionItem = ({ item: { imgSrc, itemTitle, itemDesc } }) => {
  return (
    <div className="collection-item">
      <img src={imgSrc} alt="" />
      <h4>{itemTitle}</h4>
      <p>{itemDesc}</p>
    </div>
  );
};

export default CollectionItem;

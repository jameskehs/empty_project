const CollectionItem = ({ item: { imgSrc, itemTitle, itemDesc } }) => {
  return (
    <div className="collection-item">
      <img src={imgSrc} alt="" />
      <h3>{itemTitle}</h3>
      <p className="pTwo">{itemDesc}</p>
    </div>
  );
};

export default CollectionItem;

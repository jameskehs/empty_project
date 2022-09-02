import "./People.css";

const People = ({ title, desc, persons }) => {
  return (
    <div className="people">
      <div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      {persons.map((person) => {
          <h3>{person.name}</h3>;
          <img src={person.imgSrc} alt="" />;
          return
        })}
    </div>
  );
};

export default People;

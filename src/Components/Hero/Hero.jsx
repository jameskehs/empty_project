import "./Hero.css";

const Hero = ({ title, body, imgSrc, buttons }) => {
  return (
    <div className="hero">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="hero-btn-container">
          {buttons !== undefined &&
            buttons.map((button) => {
              return <button>{button.content}</button>;
            })}
        </div>
      </div>
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default Hero;

import "./Hero.css";

const Hero = ({ title, body, imgSrc, buttons }) => {
  return (
    <div className="hero">
      <div className="hero-contents">
        <div>
          <h1>{title}</h1>
          <p className="pOne">{body}</p>
          <div className="hero-btn-container">
            {buttons !== undefined &&
              buttons.map((button, index) => {
                return <button key={index}>{button.content}</button>;
              })}
          </div>
        </div>
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
};

export default Hero;

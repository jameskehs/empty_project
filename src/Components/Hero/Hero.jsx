import "./Hero.css";

const Hero = ({ title, body, imgSrc }) => {
  return (
    <div className="hero">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default Hero;

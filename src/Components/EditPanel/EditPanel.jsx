import "./EditPanel.css";

const EditPanel = (props) => {
  switch (props.componentName) {
    case "Hero":
      {
        const { title, body, imgSrc, buttons } = props;
        return (
          <div className="EditPanel">
            <p>{title}</p>
          </div>
        );
      }
      break;
    case "Collection":
      {
        const { Title, setTitle } = props;
        return (
          <div className="EditPanel">
            <input
              value={Title}
              type="Text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        );
      }
      break;
    case "Contact":
      {
        const { title, body, imgSrc, buttons } = props;
        return (
          <div className="EditPanel">
            <p>{title}</p>
          </div>
        );
      }
      break;
    case "Gallery":
      {
        const { title, body, imgSrc, buttons } = props;
        return (
          <div className="EditPanel">
            <p>{title}</p>
          </div>
        );
      }
      break;
  }
};

export default EditPanel;

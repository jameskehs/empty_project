import "./EditPanel.css";

const EditPanel = (props) => {
  function ShowComponentProperties(props) {
    switch (props.componentName) {
      case "Hero":
        {
          const { Title, body, imgSrc, buttons } = props;
          return (
            <div className="EditPanel">
              <p>{Title}</p>
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
          const { email, phone, address } = props;
          return (
            <div className="EditPanel">
              <p>{email}</p>
            </div>
          );
        }
        break;
      case "Gallery":
        {
          const { Title, imagePairs } = props;
          return (
            <div className="EditPanel">
              <p>{Title}</p>
            </div>
          );
        }
        break;
    }
  }

  return (
    <div className="sidenav">
      <h1>Edit Panel</h1>
      <p>Welcome! Make changes to your website here!</p>
      {ShowComponentProperties(props)}
    </div>
  );
};

export default EditPanel;

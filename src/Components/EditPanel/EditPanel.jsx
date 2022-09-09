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
          const { Title, setTitle, Desc, setDesc } = props;
          return (
            <div className="EditPanel">
              <h>Collection</h>
              <br></br>
              <>{GenericTextField("Title", "Title", Title, setTitle)}</>
              <br></br>
              <>{GenericTextField("Description", "Desc", Desc, setDesc)}</>
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
      case "empty":
        {
          const { Title, imagePairs } = props;
          return (
            <div className="EditPanel">
              <p>
                Select an existing website component to edit or Add a website
                component below
              </p>
            </div>
          );
        }
        break;
    }
  }

  //Creates a simple text field and label for string value
  function GenericTextField(visualName, id, currValue, onChange) {
    return (
      <>
        <label for={id}>{visualName}</label>
        <input
          id={id}
          value={currValue}
          type="Text"
          placeholder={visualName}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </>
    );
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

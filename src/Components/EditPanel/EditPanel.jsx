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
              <br></br>
              <></>
            </div>
          );
        }
        break;
      case "Collection":
        {
          const {
            Title,
            setTitle,
            Desc,
            setDesc,
            setIsEditing,
            setIsEditable,
            saveValues,
          } = props;
          return (
            <div className="EditPanel">
              <h1>Collection</h1>
              <br></br>
              <>{GenericTextField("Title", "Title", Title, setTitle)}</>
              <br></br>
              <>{GenericTextField("Description", "Desc", Desc, setDesc)}</>
              <br></br>
              <>
                {SaveAndDiscardButtons(saveValues, () => {
                  setIsEditing(false);
                  setIsEditable(false);
                })}
              </>
            </div>
          );
        }
        break;
      case "Contact":
        {
          const { email, phone, address } = props;
          return (
            <div className="EditPanel">
              <h1>Contact</h1>
              <br></br>
              <></>
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
              <br></br>
              <></>
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
              <br></br>
              <label for="addComponents">Add a component:</label>

              <select name="addComponents" id="addComponents">
                <option value="Hero">Hero</option>
                <option value="Collection">Collection</option>
                <option value="Contact">Contact</option>
                <option value="Gallery">Gallery</option>
              </select>
            </div>
          );
        }
        break;
    }
  }

  function SaveAndDiscardButtons(onSave, onDiscard) {
    return (
      <>
        <button
          onClick={() => {
            onSave();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            onDiscard();
          }}
        >
          Discard
        </button>
      </>
    );
  }

  function EmptyFunctionPlaceholder() {}

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
      <br></br>
      <hr></hr>
      <br></br>
      {ShowComponentProperties(props)}
      <br></br>
      <hr></hr>
      <br></br>
      <p>Global options</p>
    </div>
  );
};

export default EditPanel;

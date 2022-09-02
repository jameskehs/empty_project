import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import Collection from "./Components/Collection/Collection";

function App() {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    async function fetchLayout() {
      const { data } = await axios.get("/api/layouts/2");
      setLayout(data.layout);
    }

    fetchLayout();
  }, []);

  const Components = {
    NavBar: NavBar,
    Hero: Hero,
    Collection: Collection,
  };

  return (
    <div className="App">
      {layout.length > 0 &&
        layout.map((component, index) => {
          component.props.key = index;
          return React.createElement(Components[component.componentName], component.props);
        })}
    </div>
  );
}

export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";

function App() {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    async function fetchLayout() {
      const { data } = await axios.get("/api/layouts/1");
      setLayout(data.layout);
    }

    fetchLayout();
  }, []);

  const Components = {
    NavBar: NavBar,
    Hero: Hero,
  };

  return (
    <div className="App">
      {layout.length > 0 &&
        layout.map((component, index) => {
          console.log(component);
          component.props.key = index;
          return React.createElement(Components[component.componentName], component.props);
        })}
    </div>
  );
}

export default App;

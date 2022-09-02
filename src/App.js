import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import People from "./Components/People/People";
import Gallery from "./Components/Gallery/Gallery";
import Contact from "./Components/Contact/Contact";

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
    People: People,
    Gallery: Gallery,
    Contact: Contact
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

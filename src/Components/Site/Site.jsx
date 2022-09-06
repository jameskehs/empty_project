import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Hero from "../Hero/Hero";
import Collection from "../Collection/Collection";

const Components = {
  NavBar: NavBar,
  Hero: Hero,
  Collection: Collection,
};

const Site = () => {
  const { siteID } = useParams();
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    async function fetchLayout() {
      const { data } = await axios.get(`/api/layouts/${siteID}`);
      setLayout(data);
    }
    fetchLayout();
  }, []);
  return (
    layout.length > 0 &&
    layout.map((component) => {
      const { moduleid, module, sortOrder } = component;
      module.props.key = moduleid;
      if (Components[module.componentName] === undefined) {
        return;
      }
      return React.createElement(
        Components[module.componentName],
        module.props
      );
    })
  );
};

export default Site;

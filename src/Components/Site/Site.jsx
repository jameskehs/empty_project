import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Hero from "../Hero/Hero";
import Collection from "../Collection/Collection";
import Gallery from "../Gallery/Gallery";
import EditPanel from "../EditPanel/EditPanel";
import "./Site.css";
import { createContext } from "react";

const Components = {
  NavBar: NavBar,
  Hero: Hero,
  Collection: Collection,
  Gallery: Gallery,
};

export const isLoggedInContext = createContext();

const Site = () => {
  const { siteID } = useParams();
  const [layout, setLayout] = useState([]);
  const [editEmpty, setEditEmpty] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchLayout() {
      const { data } = await axios.get(`/api/layouts/${siteID}`);
      setLayout(data);
    }

    if (localStorage.getItem("JKJBJWT") !== null) {
      setIsLoggedIn(true);
    }

    fetchLayout();
  }, []);

  return (
    <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {editEmpty && isLoggedIn && <EditPanel componentName="empty" componentID="empty" />}
      <div style={isLoggedIn ? { width: "80%" } : { width: "100%" }}>
        {layout.length > 0 &&
          layout.map((component) => {
            const { moduleid, module, sortOrder } = component;
            module.props.key = moduleid;
            if (Components[module.componentName] === undefined) {
              return <></>;
            }
            return React.createElement(Components[module.componentName], module.props);
          })}
      </div>
      <div className="dashboard-link">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </Link>
      </div>
    </isLoggedInContext.Provider>
  );
};

export default Site;

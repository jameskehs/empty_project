import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Users from "../Users/Users";
import EditPanel from "../EditPanel/EditPanel";

const Dashboard = () => {
  const [allSites, setAllSites] = useState([]);
  useEffect(() => {
    async function fetchAllSites() {
      const { data } = await axios.get("/api/layouts/all");
      setAllSites(data);
    }

    fetchAllSites();
  }, []);

  return (
    <>
      <EditPanel componentName="hidden" />
      <div className="dashboard">
        <h1>Welcome to the Dashboard</h1>
        <div className="sites-container">
          <h3>All Sites</h3>
          {allSites.map((site) => {
            return <Link to={`/site/${site.siteid}`}>{site.name}</Link>;
          })}
        </div>
        <div className="users-container">
          <h3>Users</h3>
          <Users />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

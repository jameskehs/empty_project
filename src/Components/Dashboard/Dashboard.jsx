import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Users from "../Users/Users";

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
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <div className="dashboard-links">
        {allSites.map((site) => {
          return <Link to={`/site/${site.siteid}`}>{site.name}</Link>;
        })}
      </div>
      <Users />
    </div>
  );
};

export default Dashboard;

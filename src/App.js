import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Site from "./Components/Site/Site";

function App() {
  return (
    <div className="App">
      <div className="dashboard-link">
        <Link to="/">Go back to Dashboard</Link>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/site/:siteID" element={<Site />} />
      </Routes>
    </div>
  );
}

export default App;

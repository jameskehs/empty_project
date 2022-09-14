import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Site from "./Components/Site/Site";
import Admin from "./Components/Admin/Admin";
import Users from "./Components/Users/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/site/:siteID" element={<Site />} />
        <Route path="/site/:siteID/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;

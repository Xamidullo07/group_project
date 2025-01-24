import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./style.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bacraound">
      <Navbar />
      <Sidebar />
      <Outlet/>
    </div>
  );
}

export default MainLayout;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="main/g" />
          {/* <Route path="/" element={<Profile />} /> */}
        </Route>

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/ragister" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

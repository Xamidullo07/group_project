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
        {/* <Routes path = "/" element = {<Login/>}/> */}
        <Route path="/" element={<MainLayout />}>
          {/* <Route path="main/groups/:groupId" element={<h1>Group Detail</h1>} /> */}
          {/* <Route path="/main" element={<Profile />} /> */}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/ragister" element={<Register />} />
        {/* <Route path="*" element = {<h1>Nod found</h1>}/> */}
      </Routes>
    </div>
  );
}

export default App;

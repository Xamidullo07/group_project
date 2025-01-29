import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";
import MainLayout from "./components/Layout/MainLayout";
import GroupDetail from "./components/GroupDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainLayout />}>
          <Route path="/main/groups/:groupId" element={<GroupDetail />} />
          <Route path="/main" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/ragister" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

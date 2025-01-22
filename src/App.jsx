import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Profile />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/ragister" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

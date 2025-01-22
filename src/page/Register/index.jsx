import axios from "axios";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../components/img/icon.svg";

function Register() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let username = e.target[1].value;
    let password = e.target[2].value;
    console.log(username, password);

    let response = await axios.post(
      "https://nt-shopping-list.onrender.com/api/users",
      {
        name,
        username,
        password,
      }
    );
    console.log(response);

    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      toast.success("Signed up successfully");
      navigate("/");
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    // <div>
    //   <form action="" onSubmit={onSubmit}>
    //     <input type="text" placeholder="Name" />
    //     <input type="text" placeholder="Username" />
    //     <input type="password" placeholder="password" />
    //     <button>Sign Up</button>
    //   </form>
    //   <div>
    //     <p>No account yet?</p>
    //     <NavLink to={"/"}>Create One</NavLink>
    //   </div>
    // </div>
    <div className="container">
      <div className="left-panel">
        <img className="logo" src={logo} alt="" />
        <h2 className="welcome-text">Welcome back to</h2>
        <h1 className="app-title">Shopping List</h1>
      </div>
      <div className="right-panel">
        <div className="form-container">
          <div className="form-header">
            <h2>Register</h2>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input id="name" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <NavLink to={"/login"} href="#" className="signup-link">
              Log In.
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

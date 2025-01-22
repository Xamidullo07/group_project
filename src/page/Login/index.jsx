import axios from "axios";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../components/img/icon.svg"
import "./style.css";

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    console.log(username, password);

    let response = await axios.post(
      "https://nt-shopping-list.onrender.com/api/auth",
      {
        username,
        password,
      }
    );
    console.log(response);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Signed in successfully");
      navigate("/");
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    // <>
    //   <div className="login">
    //     <div className="login_page">
    //       <form action="" onSubmit={onSubmit}>
    //         <input type="text" placeholder="login" />
    //         <input type="password" placeholder="password" />
    //         <button>sign in</button>
    //       </form>
    //       <div>
    //         <p>No account yet?</p>
    //         <NavLink to={"/ragister"}>Create One</NavLink>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div className="container">

      <div className="left-panel">
        <img className="logo" src={logo} alt="" />
        <h2 className="welcome-text">Welcome back to</h2>
        <h1 className="app-title">Shopping List</h1>
      </div>
      <div className="right-panel">
        <div className="form-container">
          <div className="form-header">
            <h2>Sign In</h2>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              {/* <LogIn className="login-icon" /> */}
              Sign In
            </button>
          </form>

          <p className="signup-text">
            No account yet?{' '}
            <NavLink to={"/ragister"} href="#" className="signup-link">
              Create One
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

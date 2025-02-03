import axios from "axios";
import React from "react";
import {  Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../components/img/icon.svg";
import "./style.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "antd";

// const validationSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(6, "at least 6 characters")
//     .required("Password is required")
//     .max(8, "no more than 8 characters"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 8 characters"),
// });

function Login() {
  const initialValue = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(e);

    e.preventDefault();
    try {
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

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Signed in successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Incorrect password or username");
    }
  };
  if (localStorage.getItem("token")) {
    return <Navigate to={"/main"} />;
  }

  return (
    <div className="container">
      <div className="left-panel">
        <img className="logo" src={logo} alt="" />
        <h2 className="welcome-text">Welcome back to</h2>
        <h1 className="app-title">Shopping List</h1>
      </div>
      <div className="right-panel">
        <div className="form-container">
          <div className="form-header">
            <h2>Login</h2>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required />
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          {/* <Formik initialValue = {initialValue} validationSchema = {validationSchema} onSubmit = {onSubmit}>
            {()=> (<Form>
             <div>
              <label htmlFor="username">Username</label>
              <Field type ="text" name = "username" id = "username"/>
              <ErrorMessage name = "username"  className="error"/>
             </div>
             <div>
              <label htmlFor="password">Password</label>
              <Field type ="password" name = "password" id = "password"/>
              <ErrorMessage name = "password" className="error"/>
             </div>
              <button className="submit-button" type="submit">submit</button>
            </Form>
            ) }            
           </Formik> */}

          <p className="signup-text">
            No account yet?{" "}
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

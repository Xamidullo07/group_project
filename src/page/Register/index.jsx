import axios from "axios";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    
    if (response.status === 200){
      localStorage.setItem("token",response.data.token)
      toast.success("Signed up successfully");
      navigate("/")
    }
  
  };

  if (localStorage.getItem("token")){
    return <Navigate to={"/"}/>
  }
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="password" />
        <button>Sign Up</button>
      </form>
      <div>
        <p>No account yet?</p>
        <NavLink to={"/"}>Create One</NavLink>
      </div>
    </div>
  );
}

export default Register;

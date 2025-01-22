import React from 'react'
import { Navigate } from 'react-router-dom'

function Profile() {
  if (!localStorage.getItem("token")){
    return <Navigate to={"/login"}/>
  }
  return (
    <div>Profile
    </div>

  )
}

export default Profile


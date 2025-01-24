import React from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
import { Button } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import avater from "../../components/img/user.png"

function Profile() {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <div className="profile-content">
        <div className="profile-nav">
          <h2 className="profile-title">Your Profile</h2>
          <div className="profile-btn">
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className="copy-button"
            >
              Copy Username
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className="delet-button"
            >
              Delete Account
            </Button>
          </div>
        </div>
        <div>
          <img className="profile-avatar" src={avater} alt="" />
        </div>
      </div>
    </>
  );
}

export default Profile;

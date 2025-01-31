import React from "react";
import { Input, Badge, Button, Space } from "antd";
import {
  BellOutlined,
  PlusOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import icon from "../img/icon.svg";
import "./style.css";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { memo } from "react";

const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            <img className="navbar-icon" src={icon} alt="" />
          </a>
          <Button type="primary" icon={<PlusOutlined />} className="new-button">
            {" "}
            New
          </Button>

          <Search
            placeholder="Search group and join..."
            className="navbar-search"
            size="large"
          />

          <Space size="middle" className="navbar-actions">
            <Button
              type="text"
              icon={<SyncOutlined />}
              className="action-button"
              href="/"
            />

            <Badge count="9+" size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="action-button"
              />
            </Badge>

            <Button
              type="text"
              icon={<SettingOutlined />}
              className="action-button settings-button"
              onClick={() => {
                localStorage.removeItem("token")
               toast.success("Logged out successfully");
                navigate("/login")
              }}
            />
          </Space>
        </div>
      </div>
      {/* <Outlet/> */}
    </>
  );
};

export default memo( Navbar);

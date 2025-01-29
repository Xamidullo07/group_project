import React, { memo, useEffect, useState } from "react";
import {
  UserCircle2,
  Users2,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import "./style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCrearing] = useState(false);

  const handleCloseModal = () => {
    setIsCrearing(false);
  };

  useEffect(() => {
    (async function () {
      let response = await axios.get(
        "https://nt-shopping-list.onrender.com/api/groups",
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      setGroups(response.data);
    })();
  }, []);

  const onCreateGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const groupName = formData.get("name");
    const groupPassword = formData.get("password");
    let response = await axios.post(
      "https://nt-shopping-list.onrender.com/api/groups",
      {
        name: groupName,
        password: groupPassword,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 201) {
      toast.success("Group created successfully");
      setGroups([...groups, response.data.group]);
      setIsCrearing(!isCreating);
    }
    console.log(response);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-item">
          <NavLink to={`/main`} className="sidebar-text">
            <UserCircle2 className="sidebar-icon" size={24} />
            Profile
          </NavLink>
        </div>

        <div
          className={`sidebar-item active`}
          onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}
        >
          <Users2 className="sidebar-icon" size={24} />
          <span className="sidebar-text">Groups</span>
          {isGroupsExpanded ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronUp size={20} />
          )}
        </div>

        {isGroupsExpanded && (
          <>
            <div
              onClick={() => {
                setIsCrearing(!isCreating);
              }}
              className="create-group"
            >
              <Plus size={20} />
              <span>Create Group</span>
            </div>
            {isCreating ? (
              <div className="modal">
                <div className="modal-content">
                  <div className="modal-header">
                    Group name and password
                    <button className="close-button" onClick={handleCloseModal}>
                      X
                    </button>
                  </div>
                  <form onSubmit={onCreateGroup} className="modal-body">
                    <input
                      type="text"
                      placeholder="Group name"
                      className="input-field"
                      name="name"
                    />
                    <input
                      type="password"
                      placeholder="Group password"
                      className="input-field"
                      name="password"
                    />
                    <div className="modal-footer">
                      <button type="submit" className="create-button">
                        Create
                      </button>
                      <button
                        className="cancel-button"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="group-list">
              {groups.map((group) => (
                <NavLink
                  key={group._id}
                  to={`/main/groups/${group._id}`}
                  className="group-item"
                >
                  {group.name}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Sidebar);

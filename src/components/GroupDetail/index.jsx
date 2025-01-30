import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

function GroupDetail() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          `https://nt-shopping-list.onrender.com/api/groups`,
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );

        let resgroup = response.data.find((val) => val._id === String(groupId));
        setGroup(resgroup);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    })();
  }, [groupId]);

  if (!group) {
    return <div className="loading">loading</div>;
  }

  return (
    <div className="group-detail">
      <h1 className="group-title">{group.name}</h1>

      <div className="group-header">
        <div className="owner">
          <div>
            <span>Owner: </span>
            <span className="avatar">{group.owner.name.charAt(0)}</span>
            {group.owner.name} ({group.owner.username})
          </div>
          <div className="dropdown">
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              &#x22EE; {/* Uchta nuqta (vertical ellipsis) */}
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => alert("Add member")}>Add member</button>
                <button onClick={() => alert("Delete Group")}>
                  Delete Group
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="group-content">
        <div className="items">
          <h2>
            Items <span className="badge">{group.items.length}</span>
          </h2>
          <input className="items-input" type="text" placeholder="Title" />
          <button className="add-btn">+</button>
          <div className="items-lists">
            {group?.items?.map((item) => (
              <div className="items-list">
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="members">
          <h2>
            Members <span className="badge">{group.members.length}</span>
          </h2>
          <ul>
            {group.members.map((member, index) => (
              <li key={index}>
                <span className="avatar">{member.name.charAt(0)}</span>
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;

import React, { useEffect, useState } from "react";
import "./stayle.css";
import axios from "axios";
import { addMethod } from "yup";
import { toast } from "react-toastify";

function ModalAddMember({
  onClose,
  groupId,
  setAddMeModal,
  setmembers,
  members: oldMembers,
}) {
  const [members, setMembers] = useState([]);
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    (async () => {})();
  }, []);

  const onChange = async (val) => {
    let res = await axios.get(
      `https://nt-shopping-list.onrender.com/api/users/search?q=${val}`
    );
    if (res.status === 200) {
      setMembers(res.data);
    }
    console.log(members, "member searche");
  };

  const addMember = async (member) => {
    try {
      let res = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members`,
        { memberId: member._id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAddMeModal(false);
      setmembers([...oldMembers, member]);
       toast.success("Added to group successfully", {
              position: "top-right",
              autoClose: 3000,
            });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Add Member</h2>
        <input
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Search user"
        />

        <div className="modal-items">
          {members.map((val) => (
            <p onClick={() => addMember(val)}>{val.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalAddMember;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";

function GroupDetail() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [members, setmembers] = useState([]);
  const inputRef = useRef(null);
  const [me, setMe] = useState(null);
  const [bought, setBought] = useState(false);

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
        
        let resme = await axios.get(
          `https://nt-shopping-list.onrender.com/api/auth`,{
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(resme);
        

        let resgroup = response.data.find((val) => val._id === groupId);
        setGroup(resgroup);
        setMe(resme.data);
        setItems(resgroup.items);
        setmembers(resgroup.members);
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [groupId, bought]);

  if (!group) {
    return <div className="loading">loading</div>;
  }

  const createItem = async (e) => {
    e.preventDefault();
    let title = inputRef.current.value;
    if (!title.trim()) return;
    let response = await axios.post(
      `https://nt-shopping-list.onrender.com/api/items`,
      { title, groupId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    
    console.log(response);
    setItems([...items, response.data.item]);
    inputRef.current.value = "";
    toast.success("Item is created successfully", {
      position: "top-right",
      autoClose: 3000, 
    });
    
  };

  const delItem = async (id) => {
    try {
      let res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res);

      setItems(items.filter((item) => item._id !== id));

      toast.success("Item is deleted successfully", {
        position: "top-right",
        autoClose: 3000, 
      });
    } catch (error) {
      console.error("error", error);

    
    }
  };

  const asBought = async (itemId) =>{
    let res = await axios.post(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,{},
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    setBought(!bought);
    toast.success("Marked as bought successfully", {
      position: "top-right",
      autoClose: 3000, 
    });
    // console.log(res);
    
  };

  const asNotBought = async (itemId) =>{
    let res = await axios.delete(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    setBought(!bought);
    toast.success("Marked as not bought successfully", {
      position: "top-right",
      autoClose: 3000, 
    });
    // console.log(res);
    
  };
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
            Items <span className="badge">{items.length}</span>
          </h2>
          <form action="" onSubmit={createItem}>
            <input
              className="items-input"
              type=""
              placeholder="Title"
              ref={inputRef}
            />
            <button className="add-btn" type="submit">
              +
            </button>
          </form>
          <div className="items-lists">
            {items?.map((item) => (
              <div className="items-list" key={item._id}>
                <div>
                  <p>{item.title}</p>
                </div>

                <div className="actions">
                  <button onClick={ () => {
                    if (item.isBought){
                      return asNotBought(item._id);
                    }else{
                      return asBought(item._id)
                    }
                  }} className="btn btn-green" >
                    <FaShoppingCart />
                    {item.isBought ? "bought" : "buy"}
                  </button>
                  {
                    me._id === group.owner._id ? <button
                    className="btn btn-red"
                    onClick={() => delItem(item._id)}>
                    <FaTimes />
                  </button> : ""
                  }
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="members">
          <h2>
            Members <span className="badge">{members.length}</span>
          </h2>
          <ul>
            {members.map((member) => (
              <li key={member._id}>
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

import GroupContext from 'antd/es/checkbox/GroupContext';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react'

export const GroupContex =  createContext();

function GroupContextCom({children}) {
    const [groups, setGroups] = useState([]);
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
  return <GroupContext.Provider value={[groups, setGroups]}>{children}</GroupContext.Provider>
  
}


export default GroupContextCom
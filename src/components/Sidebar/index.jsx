import React, { useState } from 'react';
import { UserCircle2, Users2, ChevronDown, ChevronUp, Plus }from 'lucide-react';
import './style.css';

const Sidebar = () => {
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const groups = ['YTPe4ka', 'test2', 'asdefertyu'];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-item">
          <UserCircle2 className="sidebar-icon" size={24} />
          <span className="sidebar-text">Profile</span>
        </div>

        <div className={`sidebar-item active`} onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}>
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
            <div className="create-group">
              <Plus size={20} />
              <span>Create Group</span>
            </div>
            <div className="group-list">
              {groups.map((group, index) => (
                <div key={index} className="group-item">
                  {group}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
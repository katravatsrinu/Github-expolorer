import React from 'react';
import "./UserInfo.css";

const UserInfo = ({ userData }) => {
    if (!userData) return null;

    return (
        <div className="user-info">
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <p>Location: {userData.location}</p>
            <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                {userData.blog}
            </a>
        </div>
    );
};

export default UserInfo;

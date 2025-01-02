import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FollowersPage.css";

const FollowersPage = () => {
    const location = useLocation();
    const { followers } = location.state || { followers: [] };
    const navigate = useNavigate();

    const handleFollowerClick = (username) => {
        // Navigate to the follower's detailed page
        navigate(`/user/${username}`);
    };

    return (
        <div className="followers-page">
            <h2>Followers</h2>
            <div className="followers-list">
                {followers.map((follower) => (
                    <div
                        key={follower.id}
                        className="follower-card"
                        onClick={() => handleFollowerClick(follower.login)}
                    >
                        <img
                            src={follower.avatar_url}
                            alt={follower.login}
                            className="follower-image"
                        />
                        <p>{follower.login}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowersPage;

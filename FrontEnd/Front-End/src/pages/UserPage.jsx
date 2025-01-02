// src/pages/UserPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserData, fetchRepositories, fetchFollowers } from "../api"; // Your API calls
import BackButton from "../components/BackButton"; // Back button component
import "./userPage.css"

const UserPage = () => {
    const { username } = useParams(); // Getting username from URL
    const [userData, setUserData] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userExists, setUserExists] = useState(false); // Track if user exists in the database
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetchUserData(username);
                setUserData(userResponse.user);
                const repoResponse = await fetchRepositories(username);
                setRepositories(repoResponse);
                const followerResponse = await fetchFollowers(username);
                setFollowers(followerResponse);

                // Check if the user already exists in the database
                // (You can replace this with your actual database check logic)
                const userCheckResponse = await fetch(`/api/checkUserExists?username=${username}`);
                const { exists } = await userCheckResponse.json();
                setUserExists(exists);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    const handleViewRepositories = () => {
        navigate(`/repositories/${username}`, { state: { repositories } });
    };

    const handleViewFollowers = () => {
        navigate(`/followers/${username}`, { state: { followers } });
    };

    const handleSaveDetails = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user", {  // Ensure this is the correct backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),  // Ensure userData contains necessary data (username, name, etc.)
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message || "User saved successfully!");
            } else {
                const data = await response.json();
                alert(data.error || "Failed to save user details.");
            }
        } catch (error) {
            console.error("Error saving user details:", error);
            alert("Error saving user details.");
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-page">
            <BackButton />
            <h1>User Profile</h1>
            {userData && (
                <div className="user-info">
                    <img
                        src={userData.avatar_url}
                        alt={userData.name}
                        className="profile-image"
                    />
                    <h2>{userData.name}</h2>
                    <p>{userData.location}</p>
                    <div>
                        <button onClick={handleViewRepositories}>View Repositories</button>
                        <button onClick={handleViewFollowers}>View Followers</button>
                    </div>
                    <div>
                        <button
                            onClick={handleSaveDetails}
                            disabled={userExists} // Disable the button if user exists in DB
                        >
                            {userExists ? "User Already Saved" : "Save Details"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;

// src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate between pages
import "./HomePage.css"; // Import updated styles

const HomePage = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        // Navigate to the user page with the username in the query string
        if (username) {
            navigate(`/user/${username}`);
        }
    };

    return (
        <div className="home-page">
            <h1 className="page-title">GitHub User Explorer</h1>
            <div className="search-card">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

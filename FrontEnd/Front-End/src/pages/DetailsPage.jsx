import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailsPage.css"

const RepositoryDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { repository } = location.state || {};

    if (!repository) {
        return <p>No repository details available.</p>;
    }

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    const openGitHubRepo = () => {
        window.open(repository.html_url, "_blank"); // Open GitHub repository in a new tab
    };

    return (
        <div className="repository-details-container">
            <button className="back-button" onClick={handleBack}>Back</button>
            <div className="repository-item" onClick={openGitHubRepo}>
                <div className="repository-details">
                    <p className="repository-name">{repository.name}</p>
                    <p className="repository-description">{repository.description || "No description available"}</p>
                    <p className="repository-language">Language: {repository.language || "Unknown"}</p>
                    <p className="repository-stars">Stars: {repository.stargazers_count || 0}</p>
                    <p className="repository-forks">Forks: {repository.forks_count || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default RepositoryDetailsPage;

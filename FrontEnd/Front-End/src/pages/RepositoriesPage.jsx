import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RepositoriesPage.css";

const RepositoriesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { repositories } = location.state || { repositories: [] };

    const handleViewMore = (repo) => {
        // Navigate to the details page with the selected repository
        navigate("/repository-details", { state: { repository: repo } });
    };

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    return (
        <div className="repositories-container">
            <button className="back-button" onClick={handleBack}>Back</button>
            <h2 className="repositories-title">Repositories</h2>
            <ul className="repositories-list">
                {repositories.map((repo) => (
                    <li key={repo.id} className="repository-item">
                        <div className="repository-details">
                            <p className="repository-name">{repo.name}</p>
                            <p className="repository-description">{repo.description || "No description available"}</p>
                        </div>
                        <button
                            className="view-more-button"
                            onClick={() => handleViewMore(repo)}
                        >
                            View More
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepositoriesPage;

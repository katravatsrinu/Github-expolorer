import React from 'react';
import "./RepositoryList.css";

const RepositoryList = ({ repositories }) => {
    if (!repositories.length) return <p>No repositories found.</p>;

    return (
        <div className="repo-list">
            <h3>Repositories:</h3>
            <ul>
                {repositories.map((repo) => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepositoryList;

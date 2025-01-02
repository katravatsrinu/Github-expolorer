// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css"; // Import the CSS for the back button

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            className="backk-button"
            onClick={() => navigate(-1)} // Navigate back to the previous page
        >
            &larr; Back
        </button>
    );
};

export default BackButton;

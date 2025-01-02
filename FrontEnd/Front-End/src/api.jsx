// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Function to fetch user data from the backend (saved GitHub user)
export const fetchUserData = async (username) => {
    try {
        const response = await axios.post(`${API_URL}/user`, { username });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Function to fetch repositories for a given user
export const fetchRepositories = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        throw error;
    }
};

// Function to fetch followers for a given user
export const fetchFollowers = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching followers:", error);
        throw error;
    }
};



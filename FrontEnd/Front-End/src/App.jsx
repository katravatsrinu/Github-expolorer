import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import FollowersPage from "./pages/FollowersPage";
import RepositoryDetailsPage from "./pages/DetailsPage"; // Import the new details page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user/:username" element={<UserPage />} />
                <Route path="/repositories/:username" element={<RepositoriesPage />} />
                <Route path="/followers/:username" element={<FollowersPage />} />
                <Route path="/repository-details" element={<RepositoryDetailsPage />} /> {/* Add new route */}
            </Routes>
        </Router>
    );
}

export default App;

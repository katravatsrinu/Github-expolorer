
GitHub User Management Application
This application allows you to search, view, and save GitHub user profiles, along with their repositories and followers. The backend integrates with the GitHub API to fetch user data and stores it in a local database, enabling functionality for user management such as saving, updating, and retrieving user details.

Features
Search GitHub Users: Search for GitHub users by username.
User Profile: View user details like profile picture, name, location, repositories, and followers.
Save User Data: Save GitHub user data into the local database.
View Repositories & Followers: See the repositories and followers of a user.
Mutual Friends: Find mutual friends between users based on followers.
Technologies Used
Frontend:
React.js
React Router
Axios (for making API requests)
Vite (for bundling and serving the app)
Backend:
Node.js
Express.js
MySQL (for storing user data)
Axios (for fetching data from GitHub API)
Getting Started
Prerequisites
Node.js (version 14 or higher)
MySQL
Git
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/github-user-management.git
cd github-user-management
Install dependencies for the frontend:
bash
Copy code
cd frontend
npm install
Install dependencies for the backend:
bash
Copy code
cd backend
npm install
Set up the MySQL database:
Create a new database in MySQL.
Import the necessary SQL schema for the users table.
sql
Copy code
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    location VARCHAR(255),
    bio TEXT,
    blog VARCHAR(255),
    public_repos INT,
    public_gists INT,
    followers INT,
    following INT,
    avatar_url VARCHAR(255),
    soft_deleted BOOLEAN DEFAULT 0
);
Start the backend server:
bash
Copy code
cd backend
npm start
The backend will run on http://localhost:3000.

Start the frontend server:
bash
Copy code
cd frontend
npm run dev
The frontend will run on http://localhost:5173.

API Endpoints
1. POST /api/user - Save user data
Saves a GitHub user’s profile into the database.
Request Body: { "username": "username" }
Response:
201: User saved successfully.
200: User already exists.
500: Database error.
2. POST /api/user/friends - Find mutual friends
Finds mutual followers between two users.
Request Body: { "username": "username" }
Response: List of mutual friends.
3. GET /api/users - Search users
Fetch users based on username or location.
Query Parameters:
username (optional)
location (optional)
Response: List of users.
4. PUT /api/user/:username - Update user
Update details of a user.
Request Body: Object with fields to update (e.g., name, bio).
Response: Success or error message.
5. DELETE /api/user/:username - Soft delete user
Soft delete a user by setting soft_deleted to 1.
Response: Success or error message.
6. GET /api/users/list - List users
List users sorted by a specified field.
Query Parameters:
sortBy (optional, default: created_at)
page (optional, default: 1)
limit (optional, default: 10)
Response: Paginated list of users.
Frontend User Interface
The frontend provides a user-friendly interface to:

Search GitHub users by username.
View detailed user profiles including name, location, avatar, repositories, and followers.
Save GitHub user profiles to the local database.
Navigate between user profiles and followers pages.
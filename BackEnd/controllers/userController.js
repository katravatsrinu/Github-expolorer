const axios = require('axios');
const db = require('../models/db');
// const { check, validationResult } = require('express-validator');

// Save user data
exports.saveUser = async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required.' });

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        if (results.length > 0) {
            return res.status(200).json({ message: 'User already exists in database.', user: results[0] });
        }

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { login, name, location, bio, blog, public_repos, public_gists, followers, following, avatar_url } = response.data;

            db.query(
                `INSERT INTO users (username, name, location, bio, blog, public_repos, public_gists, followers, following, avatar_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [login, name, location, bio, blog, public_repos, public_gists, followers, following, avatar_url],
                (err) => {
                    if (err) return res.status(500).json({ error: 'Error saving user to database.' });
                    res.status(201).json({ message: 'User saved successfully.' });
                }
            );
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data from GitHub API.' });
        }
    });
};


// Find mutual friends
exports.findMutualFriends = async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required.' });

    try {
        const { data: following } = await axios.get(`https://api.github.com/users/${username}/following`);
        const { data: followers } = await axios.get(`https://api.github.com/users/${username}/followers`);

        const followingSet = new Set(following.map(user => user.login));
        const mutualFriends = followers.filter(user => followingSet.has(user.login));

        const saveFriendPromises = mutualFriends.map(friend => {
            return new Promise((resolve, reject) => {
                db.query('SELECT id FROM users WHERE username = ?', [friend.login], (err, results) => {
                    if (err) return reject(err);
                    if (results.length === 0) return resolve();

                    const friendId = results[0].id;
                    db.query(
                        `INSERT INTO friends (user_id, friend_id)
                         VALUES ((SELECT id FROM users WHERE username = ?), ?)`,
                        [username, friendId],
                        (err) => {
                            if (err) return reject(err);
                            resolve();
                        }
                    );
                });
            });
        });

        await Promise.all(saveFriendPromises);

        res.status(200).json({ message: 'Mutual friends saved.', mutualFriends });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Search users
exports.searchUsers = (req, res) => {
    const { username, location, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM users WHERE soft_deleted = 0';
    const params = [];

    if (username) {
        query += ' AND username LIKE ?';
        params.push(`%${username}%`);
    }
    if (location) {
        query += ' AND location LIKE ?';
        params.push(`%${location}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};


// Soft delete user
exports.softDeleteUser = (req, res) => {
    const { username } = req.params;
    db.query('UPDATE users SET soft_deleted = 1 WHERE username = ?', [username], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User soft deleted successfully.' });
    });
};

// Update user fields
exports.updateUser = (req, res) => {
    const { username } = req.params;
    const updates = req.body;

    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);

    db.query(`UPDATE users SET ${fields} WHERE username = ?`, [...values, username], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User updated successfully.' });
    });
};

// List users with sorting
exports.listUsers = (req, res) => {
    const validColumns = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
    const { sortBy = 'created_at', page = 1, limit = 10 } = req.query;

    if (!validColumns.includes(sortBy)) {
        return res.status(400).json({ error: 'Invalid sortBy parameter.' });
    }

    const offset = (page - 1) * limit;
    db.query(
        `SELECT * FROM users WHERE soft_deleted = 0 ORDER BY ${sortBy} LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(results);
        }
    );
};


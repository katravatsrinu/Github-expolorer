const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',     // Replace with your DB host
    user: 'root',          // Replace with your DB username
    password: '1234',          // Replace with your DB password
    database: 'github_users' // Replace with your DB name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

module.exports = db;

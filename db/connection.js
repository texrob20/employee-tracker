const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'company',
      // Your MySQL password
      password: 'R0B3r7!',
      database: 'company'
    },
    console.log('Connected to the company database.')
  );

module.exports = db;
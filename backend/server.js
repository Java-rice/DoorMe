const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT,
      university TEXT,
      socialStatus TEXT,
      phoneNumber TEXT,
      username TEXT UNIQUE,
      password TEXT,
    )
  `);

  // Insert initial user
  const initialUser = `
    INSERT INTO users (fullName, email, university, socialStatus, phoneNumber, username, password)
    VALUES ('John Doe', 'john@example.com', 'Example University', 'Student', '+63 999 999 9999', 'john_doe', 'password123')
  `;

  db.run(initialUser, function (err) {
    if (err && err.message.includes('SQLITE_CONSTRAINT')) {
      // The initial user already exists, no need to insert again
      return;
    } else if (err) {
      console.error('Error inserting initial user:', err.message);
    }
  });

  // Drop and recreate housing table to fix schema issue
  db.run(`
    DROP TABLE IF EXISTS housing
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS housing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      details TEXT,
      price TEXT,
      rating REAL,
      reviews INTEGER,
      latitude REAL,
      longitude REAL
    )
  `);

  // Insert predefined housing data
  const initialHousingData = `
    INSERT INTO housing (image, title, details, price, rating, reviews)
    VALUES
     ('src/assets/covenantGarden.png', 'Covent Garden Sta. Mesa Condo for Rent near PUP & UERM', '4-6 guests · Entire Condo · 6 beds · Shared bath · Wifi · Kitchen · Free Parking', 'Php 5,680 /month', 5.0, 318, 14.6, 120.94),
    ('src/assets/elpueblocondo.png', 'El Pueblo Condo For Rent', '4-6 persons · Entire Room · 4 beds · 1 bath · Wifi · Kitchen', 'Php 6,755 /month', 5.0, 318, 14.6, 120.99)
`;

  db.run(initialHousingData, function (err) {
    if (err && err.message.includes('SQLITE_CONSTRAINT')) {
      // The initial housing data already exists, no need to insert again
      return;
    } else if (err) {
      console.error('Error inserting initial housing data:', err.message);
    }
  });
});

// Endpoint to fetch all housing data
app.get('/api/housing', (req, res) => {
  const query = `
    SELECT id, image, title, details, price, rating, reviews, latitude, longitude FROM housing
  `;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Send housing data as JSON response
  });
});

// Register user endpoint
app.post('/api/register', (req, res) => {
  const { fullName, email, university, socialStatus, phoneNumber, username, password } = req.body;
  const query = `
    INSERT INTO users (fullName, email, university, socialStatus, phoneNumber, username, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [fullName, email, university, socialStatus, phoneNumber, username, password], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully', id: this.lastID });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = `
    SELECT * FROM users WHERE username = ? AND password = ?
  `;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json({ message: 'Login successful', user: row });
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
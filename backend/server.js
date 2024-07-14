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

// Create tables if they don't exist
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
      password TEXT
    )
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

  db.run(`
    CREATE TABLE IF NOT EXISTS universities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      latitude REAL,
      longitude REAL
    )
  `);

  // Insert initial user (without hashing)
  const initialUser = `
    INSERT INTO users (fullName, email, university, socialStatus, phoneNumber, username, password)
    VALUES ('John Doe', 'john@example.com', 'Example University', 'Student', '+63 999 999 9999', 'john_doe', 'password123')
  `;

  db.run(initialUser, function (err) {
    if (err && err.message.includes('SQLITE_CONSTRAINT')) {
      // The initial user already exists, no need to insert again
      console.log('Initial user already exists');
      return;
    } else if (err) {
      console.error('Error inserting initial user:', err.message);
    } else {
      console.log('Initial user inserted');
    }
  });

  // Insert predefined housing data
  const initialHousingData = `
    INSERT INTO housing (image, title, details, price, rating, reviews, latitude, longitude)
    VALUES
     ('src/assets/covenantGarden.png', 'Covent Garden Sta. Mesa Condo for Rent near PUP & UERM', '4-6 guests · Entire Condo · 6 beds · Shared bath · Wifi · Kitchen · Free Parking', 'Php 5,680 /month', 5.0, 318, 14.60185734269596, 121.0126889565575),
    ('src/assets/elpueblocondo.png', 'El Pueblo Condo For Rent', '4-6 persons · Entire Room · 4 beds · 1 bath · Wifi · Kitchen', 'Php 6,755 /month', 5.0, 318, 14.595540806870547, 121.01224216962027)
  `;

  db.run(initialHousingData, function (err) {
    if (err && err.message.includes('SQLITE_CONSTRAINT')) {
      // The initial housing data already exists, no need to insert again
      console.log('Initial housing data already exists');
      return;
    } else if (err) {
      console.error('Error inserting initial housing data:', err.message);
    } else {
      console.log('Initial housing data inserted');
    }
  });

  // Create universities table and insert predefined coordinates

  const universityCoordinates = {
    "Adamson University": [120.986, 14.6042],
    "Ateneo de Manila University": [121.0777, 14.6407],
    "De La Salle University": [120.9932, 14.5648],
    "De La Salle-College of Saint Benilde": [120.9951, 14.5636],
    "National University, Philippines": [120.9946, 14.6043],
    "Polytechnic University of the Philippines": [121.0108, 14.5979],
    "University of Santo Tomas": [120.9896, 14.6093],
    "University of the Philippines Diliman": [121.0657, 14.6537],
    "University of the Philippines Manila": [120.9918, 14.5806],
    "University of the Philippines System": [121.0657, 14.6537]
  };

  const insertUniversityQuery = `
    INSERT INTO universities (name, latitude, longitude)
    VALUES (?, ?, ?)
  `;

  for (const [name, coords] of Object.entries(universityCoordinates)) {
    db.run(insertUniversityQuery, [name, coords[1], coords[0]], function (err) {
      if (err && err.message.includes('SQLITE_CONSTRAINT')) {
        // The university already exists, no need to insert again
        console.log(`University ${name} already exists`);
        return;
      } else if (err) {
        console.error(`Error inserting university ${name}:`, err.message);
      } else {
        console.log(`University ${name} inserted`);
      }
    });
  }
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

// Register user endpoint (without password hashing)
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

// Login endpoint (without password hashing)
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

// Endpoint to fetch all universities
app.get('/api/universities', (req, res) => {
  const query = `
    SELECT name, latitude, longitude FROM universities
  `;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Send universities data as JSON response
  });
});

// Endpoint to fetch all users
app.get('/api/users', (req, res) => {
  const query = `
    SELECT id, fullName, email, university, socialStatus, phoneNumber, username FROM users
  `;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Send users data as JSON response
  });
});

app.post('/api/change-password', (req, res) => {
  const { userId, newPassword } = req.body;

  const updateQuery = `
    UPDATE users
    SET password = ?
    WHERE id = ?
  `;

  db.run(updateQuery, [newPassword, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Password changed successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
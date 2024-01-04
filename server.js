const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Add 'path' module

const app = express(); // Define 'app' variable
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('styles'));
app.use(express.static('images'));

// Route to handle resume download
app.get('/download/resume', (req, res) => {
  const resumeFilePath = path.join(__dirname, 'public', 'SOUMENFINALRESUME.pdf');
  
  // Send the file as an attachment
  res.download(resumeFilePath, 'SOUMENFINALRESUME.pdf', (err) => {
    if (err) {
      // Handle error, such as file not found
      console.error('Error downloading file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Create MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Ss123@123',
  database: 'PORTFOLIO',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  const { Name, Email, Message } = formData;

  const sql = 'INSERT INTO form_entries(name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [Name, Email, Message], (err, result) => {
    if (err) throw err;
    console.log('Data inserted:', result);
    res.send('Form submitted successfully!');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

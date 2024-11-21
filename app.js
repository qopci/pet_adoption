// Get the express package 
const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'pets'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error conneting to DB: ' + err);
    }
}

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Display the form page
    res.render('home');
});

// Define a "confirm" route
app.post('/confirm', async (req, res) => {
    // Get the data from the form
    const data = req.body;

    // Connect to the database
    const conn = await connect();

    // Write to the database
    await conn.query(`INSERT INTO adoptions (pet_type, quantity, color)
    VALUES ('${data.pet_type}', '${data.quantity}', '${data.color}')`);

    // Render the confirmations page, and pass the form data
    res.render('confirmation', { details: data });
});

// Define an "adoptions" route
app.get('/adoptions', async (req, res) => {
    const conn = await connect();
    const results = await conn.query('SELECT * FROM adoptions ORDER BY date_submitted DESC');
    res.render('adoptions', { adoptions : results });
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
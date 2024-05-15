// Requiring module
const express = require('express');

// Creating express object
const app = express();


const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
  user: 'postgres',
    password: 'Pass',
    host: 'localhost',
    port: '5000',
    database: 'postgres',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // Execute SQL queries here

        client.query('SELECT * FROM user_info', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result:', result.rows);
            }

            // Close the connection when done
            client
                .end()
                .then(() => {
                    console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                    console.error('Error closing connection', err);
                });
        });
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });


// Handling GET request
app.get('/', (req, res) => { 
    res.send('A simple Node App is '
        + 'running on this server') 
    res.end() 
}) 

// Port Number
const PORT = process.env.PORT || 3000;

// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));





//importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./Models');
const userRoutes = require('./Routes/userRoutes');

//setting up your port
const PORT = process.env.PORT || 8080

//assinging variable to express
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and foricing it to false as to not lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("Database is synchronized");
})

//routes for the user API
app.use('/api/users', userRoutes)

//listening to server connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


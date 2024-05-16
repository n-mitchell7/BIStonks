//importing modules
const {Sequelize, DataTypes} = require('sequelize');

//Database connection with dialect of postgres specifying the database being used
//port of database is 5432
//database name is postgres
const sequelize = new  Sequelize('postgres://postgres:GvxcTy8961ghdty@localhost:5432/postgres');

//checking if connection is done

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to the model
db.user_info = require('./userModel.js')(sequelize, DataTypes)

//exporting the model
module.exports = db
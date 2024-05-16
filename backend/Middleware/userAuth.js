//importing modules
const express = require('express');
const db = require("../Models");

//Assigning db.users to User variable
const User = db.user_info;

//Function to check if user or email already exists
const saveUser = async (req, res, next) => {
    //Searching for user in database
    try {
        const username = await User.findOne({ where: 
            {
                 username: req.body.username,    
                },
             });
        //if username already exist in the database respond with 409 error
             if (username) {
            res.status(409).send("User already exists");
        }
        
        //Searching for email in database
        const emailcheck = await User.findOne({ where: {
            email: req.body.email,
        },
        });

        //if email already exist in the database respond with 409 error
        if (emailcheck) {
            res.status(409).send("Email already exists");
        }

        next();
    }   
    catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    };
        //exporting module
        module.exports = {
            saveUser,
        };

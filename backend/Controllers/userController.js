//importing modules
const bcrypt = require('bcrypt');
const db = require("../Models");
const jwt = require('jsonwebtoken');

//Assigning user to the user variable
const User = db.user_info;

//Signup function
//Hashing users password before saving to database
const signup = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const data = {
            username, 
            email,
            password: await bcrypt.hashSync(password, 10),
        };
        //saving user
        const user = await User.create(data);
        res.status(201).send(user);

        //if user details are saved successfully respond with 201 status
        //Generate token with the user's id and Secret key
        //set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, `${process.env.secretKey}`
            , {
                expiresIn: 1 * 24 * 60 * 60 * 1000, //expires in 
            });

            res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 , httpOnly: true});
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            //send user details

            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

//Login authentication function

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //search for user in database
        const user = await User.findOne({
             where: {
                email: email 
                } 
            });
            //if user email is found in the database, compare the password with bcrypt
            if (user) {
                const isSame = await bcrypt.compare(password, user.password);
                //if password is correct generate token with the user's id and secret key
                if (isSame) {
                    let token = jwt.sign({ id: user.id }, `${process.env.secretKey}`,
                     {
                        expiresIn: 1 * 24 * 60 * 60 * 1000, //expires in
                });

                //if password mathces with one in the database, generate a cookie for the user
                res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true});
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);

                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
            } catch (error) {
                console.log(error);
            }
        };

    module.exports = { signup, login};

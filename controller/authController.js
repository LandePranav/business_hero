const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/User");

const register = async (req, res) => {
    const {username, password} = req.body;

    try {
        let user = await User.findOne({username});
        
        if(user){
            return res.status(400).json({
                message: "User Already Exists!"
            });
        }

        user = await User.create({
            username,
            password
        });

        // console.log(user);

        const payload = {_id: user._id};
        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {
                expiresIn: "1D"
            },
            (err, token) => {
                if(err) {
                    console.error(err);
                    return res.status(400).json({
                        message: "Error In User Creation!"
                    });
                }
                return res.cookie(
                    "token",
                    token,
                    {
                        sameSite: 'none',
                        secure: true,
                    }
                ).status(201).json({
                    _id: user._id,
                });
            }
        )

    }catch(err){
        res.status(500).json({
            message: "Server Error in Registering"
        });
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                message: "User does not exist!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Password!"
            });
        }

        const payload = {_id: user._id};

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {
                expiresIn: "1D"
            },
            (err, token) => {
                if(err) {
                    console.error(err);
                    return res.status(400).json({
                        message: "Error In User Login!"
                    });
                }
                res.cookie(
                    "token",
                    token,
                    {
                        sameSite: 'none',
                        secure: true,
                    }
                ).status(201).json({
                    _id: user._id
                });
            }
        )


    } catch (error) {
        res.status(500).json({
            message: "Server Error in Login"
        });
    }
}


module.exports = {register, login} ;
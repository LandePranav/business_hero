const jwt = require('jsonwebtoken');
const User = require('../models/User');

//middleware auth for protected routes
const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({
            message: "No token, authorization denied!"
        });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data._id);

        if(!user){
            return res.status(401).json({
                message: "User not found!",
            });
        }
        
        //attaching user to the req and forwarding
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
}

module.exports = authMiddleware;
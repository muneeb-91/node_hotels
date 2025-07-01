const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) =>{
    // First check req headers has authorized or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.json({error: 'Token not found!'});

    // Extract the jwt token from request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({err: 'Unauthorized'});

    try{
        // verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({err: 'Invalid token!'});
    }
}

// Function to generate JWT token
const generateToken = (userData)=>{
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};
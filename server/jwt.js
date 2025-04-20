const jwt = require('jsonwebtoken');
require('dotenv').config();

//generate JWT token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn: '1d'});
  
}

//verify JWT token middleware
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route - No token provided'
    });
  }
  //extract token from request headers
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route - No token provided'
    });
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Call the next middleware or route handler
  }catch (err) {
    console.error('JWT Error:', err);
    res.status(401).json({
      success: false,
      error: 'Not authorized to access this route - Invalid token'
    });
  }
}

module.exports = {jwtAuthMiddleware,generateToken};
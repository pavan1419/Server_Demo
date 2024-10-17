const jwt = require('jsonwebtoken');
const User = require('../Models/user-model');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ msg: 'Access Denied: token not provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Access Denied: token not provided' });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findOne({ email: verify.email }).select(
      '-password'
    );
    if (!userData) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('../Models/user-model');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      console.log('Token verification failed');
      return res.status(401).json({ msg: 'Token verification failed' });
    }

    const userData = await User.findOne({ email: verify.email }).select(
      '-password'
    );
    if (!userData) {
      console.log('User not found');
      return res.status(401).json({ msg: 'User not found' });
    }

    console.log('User authenticated:', userData);
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

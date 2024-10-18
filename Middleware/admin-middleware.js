const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      console.log('No user data');
      return res.status(401).json({ msg: 'Unauthorized: No user data' });
    }

    if (!req.user.isAdmin) {
      console.log('Access denied: Not an admin');
      return res.status(403).json({ msg: 'Access Denied: Admin Only' });
    }

    console.log('Admin access granted');
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;

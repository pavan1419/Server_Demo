const adminMiddleware = (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.isAdmin !== true) {
      return res.status(403).send('Access denied');
    }
    next();
  } catch (error) {
    next(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = adminMiddleware;

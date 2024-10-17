const User = require('../Models/user-model');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
  try {
    res.status(200).send('home');
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password, isAdmin } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).send({ msg: 'User already exist' });
    }

    // lets hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const UserCreated = await User.create({
      username,
      email,
      phone,
      password,
      isAdmin,
    });

    // joson web token for user authentication

    res.status(200).json({
      msg: 'User is created successfully',
      token: await UserCreated.generateAuthToken(),
      userId: UserCreated._id.toString(),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
    console.log(err);
  }
};
//------------------------
//user Login logic
//------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const userPassword = await bcrypt.compare(password, userExist.password);
    if (userPassword) {
      res.status(200).json({
        msg: 'Login successfully',
        token: await userExist.generateAuthToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
    // res.status(500).json({ msg: 'Server Error' });
  }
};

// logic for send user data to the client

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.log('Error from user controller:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
module.exports = { home, register, login, user };

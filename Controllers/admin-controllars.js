const User = require('../Models/user-model');
const Contact = require('../Models/contact-model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: 'No contacts found' });
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { getAllUsers, getAllContacts };

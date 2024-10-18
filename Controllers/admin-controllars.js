const User = require('../Models/user-model');
const Contact = require('../Models/contact-model');

// Get all users logic
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

//edit user by ID logic

const getUserById = async (req, res) => {
  try {
    const { _id } = req.params; // Correctly destructure _id from req.params
    const userData = await User.findOne(_id, { password: 0 });
    
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update user by ID logic

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params; // Ensure the route parameter is named 'id'
    console.log('Updating user with ID:', id); // Debugging log
    const updateUserData = req.body;
    console.log('Update data:', updateUserData); // Debugging log

    const updateUser = await User.updateOne({ _id: id }, { $set: updateUserData });
    console.log('Update result:', updateUser); // Debugging log

    if (updateUser.nModified === 0) {
      return res.status(404).json({ msg: 'User not found or no changes made' });
    }

    res.status(200).json({ msg: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error); // Debugging log
    next(error);
  }
};

// Delete user by ID logic

const deleteUserById = async (req, res) => {
  try {
    const { _id } = req.params; // Correctly destructure _id from req.params
    const deletedUser = await User.findByIdAndDelete({ _id});
    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get all contacts logic
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: 'No contacts found' });
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById, 
  getUserById,
  updateUserById
};

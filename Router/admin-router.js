const express = require('express');
const router = express.Router();
const adminControllers = require('../Controllers/admin-controllars');
const adminMiddleware = require('../Middleware/admin-middleware');
const authMiddleware = require('../Middleware/auth-middleware');

router
  .route('/users')
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);

router
  .route('/users/:id')
  .get(authMiddleware, adminMiddleware, adminControllers.getUserById)
  .put(authMiddleware, adminMiddleware, adminControllers.updateUserById);

router
  .route('/users/update/:id')
  .patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);

router
  .route('/users/delete/:id')
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);

router
  .route('/contacts')
  .get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);

router
  .route('/contacts/:id')
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);

module.exports = router;

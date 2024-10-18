const express = require('express');
const router = express.Router();
const adminControllars = require('../Controllers/admin-controllars');
const adminMiddleware = require('../Middleware/admin-middleware');
const authMiddleware = require('../Middleware/auth-middleware');

router
  .route('/users')
  .get(authMiddleware, adminMiddleware, adminControllars.getAllUsers);

router
  .route('/users/:id')
  .get(authMiddleware, adminMiddleware, adminControllars.getUserById) // Add this line
  .put(authMiddleware, adminMiddleware, adminControllars.updateUserById);

router
  .route('/users/update:_id')
  .patch(authMiddleware, adminMiddleware, adminControllars.updateUserById);

router
  .route('/users/delete:_id')
  .delete(authMiddleware, adminMiddleware, adminControllars.deleteUserById);

router
  .route('/contacts')
  .get(authMiddleware, adminMiddleware, adminControllars.getAllContacts);



module.exports = router;

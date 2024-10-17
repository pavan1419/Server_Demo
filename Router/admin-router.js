const express = require('express');
const router = express.Router();
const adminControllars = require('../Controllers/admin-controllars');
const adminMiddleware = require('../Middleware/admin-middleware');

router.route('/users').get(adminControllars.getAllUsers, adminMiddleware);
router.route('/contacts').get(adminControllars.getAllContacts);

module.exports = router;

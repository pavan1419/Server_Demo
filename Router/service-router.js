const express = require('express');
const router = express.Router();
const { service } = require('../Controllers/service-controllers');

// Import the service controller
router.route('/service').get(service);

// Export the router
module.exports = router;

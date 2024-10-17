const express = require('express');
const router = express.Router();
const AuthControllers = require('../Controllers/Auth_Controllers');
const validate = require('../Middleware/validate-middleware');
const { registerSchema } = require('../Validators/Auth-Validators');
const authMiddleware = require('../Middleware/auth-middleware');

// router.get('/',   (req, res) => {
//   res.status(200).send('Hello router');
// });

router.route('/').get(AuthControllers.home);
router
  .route('/register')
  .post(validate(registerSchema), AuthControllers.register);
router.route('/login').post(AuthControllers.login);

// router.get('/register', (req, res) => {
//   res.status(200).send('Register');
// });

//

router.route('/user').get(authMiddleware, AuthControllers.user);

module.exports = router;

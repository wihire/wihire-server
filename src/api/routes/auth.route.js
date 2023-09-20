const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', AuthController.login);
router.post('/register/user', AuthController.registerUser);
router.post('/register/company', AuthController.registerCompany);

module.exports = router;

const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', AuthController.login);
router.post('/register/user', AuthController.registerUser);
router.post('/register/company', AuthController.registerCompany);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/forgot-change-password', AuthController.forgotChangePassword);

module.exports = router;

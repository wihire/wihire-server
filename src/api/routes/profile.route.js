const ProfileController = require('../controllers/profile.controller');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.get('/:userSlug', authentication, ProfileController.getBySlug);

module.exports = router;
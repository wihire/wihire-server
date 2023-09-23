const ProfileController = require('../controllers/profile.controller');
const router = require('express').Router();
const upload = require('../middlewares/uploadFile');
const authentication = require('../middlewares/authentication');

router.get('/:userSlug', authentication, ProfileController.getBySlug);
router.put(
  '/:userSlug',
  upload('image')('single', ['avatar']),
  ProfileController.editProfileBySlug,
);

module.exports = router;

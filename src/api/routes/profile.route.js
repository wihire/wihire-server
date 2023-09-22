const ProfileController = require('../controllers/profile.controller');
// const authentication = require('../middlewares/authentication');
const router = require('express').Router();
const upload = require('../middlewares/uploadFile');

// router.put(
//   '/:userSlug',
//   upload.array(('image', 'pdf')(['avatar', 'resume'], 2)),
//   ProfileController.put,
// );
router.put('/:userSlug', upload('image')('single', ['avatar']), ProfileController.put);

module.exports = router;

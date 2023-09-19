const ROLE = require('../../constants/role');
const jobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const router = require('express').Router();

router.post('/:slug/save', authentication, authorization([ROLE.USER]), jobController.saveJob);
router.delete('/:slug/unsave', authentication, authorization([ROLE.USER]), jobController.unsaveJob);

module.exports = router;

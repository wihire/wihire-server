const ROLE = require('../../constants/role');
const JobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/:slug/save', authentication, authorization([ROLE.USER]), JobController.saveJob);
router.delete('/:slug/unsave', authentication, authorization([ROLE.USER]), JobController.unsaveJob);
router.delete(
  '/:slug/unsave',
  authentication,
  authorization([ROLE.COMPANY]),
  JobController.unsaveJob,
);

module.exports = router;

const ROLE = require('../../constants/role');
const JobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/', authentication, authorization([ROLE.COMPANY]), JobController.createJob);
router.get('/', authentication, JobController.getJobs);
router.post('/:slug/save', authentication, authorization([ROLE.USER]), JobController.saveJob);
router.delete('/:slug/unsave', authentication, authorization([ROLE.USER]), JobController.unsaveJob);
router.get(
  '/:slug/applicants',
  authentication,
  authorization([ROLE.COMPANY]),
  JobController.getApplicants,
);
router.put(
  '/:slug/applicants/reject-all',
  authentication,
  authorization([ROLE.COMPANY]),
  JobController.rejectAllApplicant,
);
router.delete('/:slug', authentication, authorization([ROLE.COMPANY]), JobController.deleteJob);

module.exports = router;

const ROLE = require('../../constants/role');
const JobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const upload = require('../middlewares/uploadFile');

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
router.get('/:slug', authentication, JobController.getJobDetailBySlug);
router.delete('/:slug', authentication, authorization([ROLE.COMPANY]), JobController.deleteJob);

router.post(
  '/:slug/apply',
  authentication,
  authorization([ROLE.USER]),
  upload('pdf')('single', ['resume']),
  JobController.applyJob,
);
router.get(
  '/:slug/applicants/:userSlug',
  authentication,
  authorization([ROLE.COMPANY]),
  JobController.getApplicantDetails,
);

module.exports = router;

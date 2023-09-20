const ROLE = require('../../constants/role');
const JobController = require('../controllers/job.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

const router = require('express').Router();

router.post('/', authentication, authorization([ROLE.COMPANY]), JobController.createJob);

module.exports = router;

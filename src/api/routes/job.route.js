const express = require('express');

const JobController = require('../controllers/job.controller');

const router = express.Router();

router.get('/:slug/applicants', JobController.getApplicants);

module.exports = router;

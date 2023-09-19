const express = require('express');
const router = express.Router();
const ApplicantsController = require('../controllers/applicants.controller');

router.get('/:slug/applicants', ApplicantsController.allApplicantsController);

module.exports = router;

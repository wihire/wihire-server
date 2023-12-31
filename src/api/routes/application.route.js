const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/application.controller');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const ROLE = require('../../constants/role');

router.get(
  '/',
  authentication,
  authorization([ROLE.USER]),
  ApplicationController.getApplicationUser,
);
router.get(
  '/:jobSlug/check',
  authentication,
  authorization([ROLE.USER]),
  ApplicationController.checkApplication,
);

module.exports = router;

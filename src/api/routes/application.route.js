const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/application.controller');
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const ROLE = require('../../constants/role')

router.get('/', ApplicationController.getApplicationController);

module.exports = router;

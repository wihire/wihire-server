const CompanyScopeController = require('../controllers/companyScope.controller');

const router = require('express').Router();

router.get('/', CompanyScopeController.getAll);

module.exports = router;

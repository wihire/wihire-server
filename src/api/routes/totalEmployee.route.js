const CompanyTotalEmployeeController = require('../controllers/companyTotalEmployee.controller');

const router = require('express').Router();

router.get('/', CompanyTotalEmployeeController.getAll);

module.exports = router;

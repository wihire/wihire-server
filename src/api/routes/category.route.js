const CategoryController = require('../controllers/category.controller');

const router = require('express').Router();

router.get('/', CategoryController.getAll);

module.exports = router;

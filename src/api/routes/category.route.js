const CategoryController = require('../controllers/category.controller');

const router = require('express').Router();

router.get('/', CategoryController.getAll);
router.get('/mostseven', CategoryController.getMostSeven);

module.exports = router;

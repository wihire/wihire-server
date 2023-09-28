const SkillController = require('../controllers/skill.controller');

const router = require('express').Router();

router.get('/', SkillController.getAll);

module.exports = router;

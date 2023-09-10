const HelloController = require('../controllers/hello.controller')

const router = require('express').Router()

router.get('/', HelloController.get)

module.exports = router

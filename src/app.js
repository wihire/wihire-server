const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { notFound, error } = require('./api/middlewares/error')
const routes = require('./routes')

const app = express()

/**
 * middleware
 */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * routes
 */
app.use(routes)
app.use(notFound)
app.use(error)

module.exports = app

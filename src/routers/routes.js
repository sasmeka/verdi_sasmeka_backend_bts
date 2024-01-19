const express = require('express')
const route = express.Router()

const auth_route = require('./auth_route')
const checklist = require('./checklist_route')

route.use('/', auth_route)
route.use('/checklist', checklist)

module.exports = route
const express = require('express')
const route = express.Router()
const control = require('../controllers/auth')

route.post('/login', control.login)
route.post('/register', control.register)

module.exports = route
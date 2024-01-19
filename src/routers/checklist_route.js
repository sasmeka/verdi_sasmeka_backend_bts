// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middlewares/authCheck')
const control = require('../controllers/checklist')


route.get('/', authCheck('user'), control.getAllData)
route.get('/:id/item', authCheck('user'), control.getAllDataItems)
route.post('/', authCheck('user'), control.addData)
route.post('/:id/item', authCheck('user'), control.addDataItems)
route.delete('/:id', authCheck('user'), control.deleteData)
route.delete('/:id/item/:id2', authCheck('user'), control.deleteDataItems)


//export
module.exports = route
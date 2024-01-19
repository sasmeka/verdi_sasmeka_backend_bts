const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('./src/configs/database')
const routes = require('./src/routers/routes')
app.use(routes)

db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('app running on port ' + process.env.PORT)
    })
}).catch((e) => {
    console.log(e)
})
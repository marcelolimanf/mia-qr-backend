require('dotenv').config()
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require("helmet");

const routes = require('./src/routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at port: '+process.env.PORT+'')
})
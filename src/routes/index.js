const express = require('express')
const routes = express.Router()

const Auth = require('../middlewares/Auth')
const AuthController = require('../controllers/AuthController')
const CustomerController = require('../controllers/CustomerController')
const ContainerController = require('../controllers/ContainerController')

//Auth Routes
routes.post('/auth/signin', AuthController.signin)
routes.post('/auth/signup', AuthController.signup)

// Customers Routes
routes.get('/customers/list', Auth, CustomerController.list)
routes.post('/customers/add', Auth, CustomerController.add)
routes.post('/customers/delete', Auth, CustomerController.delete)

// Container Routes
routes.get('/containers/list', Auth, ContainerController.list)
routes.post('/containers/add', Auth, ContainerController.add)
routes.post('/containers/delete', Auth, ContainerController.delete)
routes.post('/containers/link', Auth, ContainerController.link)
routes.get('/containers/info', ContainerController.info)

module.exports = routes

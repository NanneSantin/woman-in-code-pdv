const express = require('express');

const { registerUser, detailUser, updateUser } = require('./controllers/users');
const authenticateUser = require('./controllers/login');
const listCategories = require('./controllers/categories');

const validateRequestBody = require('./middlewares/validateRequestBody');
const validateAuthentication = require('./middlewares/auth');

const loginSchema = require('./validations/loginSchema');
const userSchema = require('./validations/userSchema');

const productSchema = require('./validations/productSchema');
const validateCategoryExist = require('./middlewares/validateCategoryExist');
const { registerProduct, updateProduct } = require('./controllers/products');
const customerSchema = require('./validations/customerSchema');
const { registerCustomer, updateCustomer } = require('./controllers/customer');
const validateCustomerExist = require('./middlewares/validateCustomerExist');

const route = express();

route.post('/usuario', validateRequestBody(userSchema), registerUser);
route.post('/login', validateRequestBody(loginSchema), authenticateUser);
route.get('/categoria', listCategories);

route.use(validateAuthentication);

route.get('/usuario', detailUser);
route.put('/usuario', validateRequestBody(userSchema), updateUser);

route.post('/cliente', validateRequestBody(customerSchema), registerCustomer);
route.put('/cliente/:id', validateRequestBody(customerSchema), validateCustomerExist, updateCustomer);

route.post('/produto', validateRequestBody(productSchema), validateCategoryExist, registerProduct);
route.put('/produto/:id', validateRequestBody(productSchema), validateCategoryExist, updateProduct);

module.exports = route;

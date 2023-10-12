const express = require('express');
const { registerUser, detailUser } = require('./controllers/users');
const { validateRequestBody } = require('./middlewares/validateRequestBody');
const loginSchema = require('./validations/loginSchema');
const userSchema = require('./validations/userSchema');
const authenticateUser = require('./controllers/login');
const { validateAuthentication } = require('./middlewares/auth');
const listCategories = require('./controllers/categories');

const route = express();

route.get('/categoria', listCategories);

route.post('/usuario', validateRequestBody(userSchema), registerUser);
route.post('/login', validateRequestBody(loginSchema), authenticateUser);

route.use(validateAuthentication);

route.get('/usuario', detailUser);

module.exports = route;

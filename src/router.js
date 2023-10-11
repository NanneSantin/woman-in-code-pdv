const express = require('express');
const { validateRequestBody } = require('./middlewares/validateRequestBody');
const { authentication } = require('./middlewares/auth');
const { userSchema, loginSchema } = require('./validations/userSchema');
const { registerUser, loginUser } = require('./controllers/users');

const route = express();

route.post('/usuario', validateRequestBody(userSchema), registerUser);
route.post('/login', validateRequestBody(loginSchema), loginUser);
route.use(authentication);
route.get('/', async (request, response) => response.status(200).json({ message: 'Hello world!' }));

module.exports = route;
const express = require('express');
const validateRequestBody = require('./midlewares/validateRequestBody');
const userSchema = require('./validations/userSchema');
const { registerUser } = require('./controllers/users');

const route = express();

route.get('/', async (request, response) => response.status(200).json({ message: 'Hello world!' }));
route.post('/usuario', validateRequestBody(userSchema), registerUser);

module.exports = route;

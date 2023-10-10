const express = require('express');

const route = express();

route.get('/', async (request, response) => response.status(200).json({ message: 'Hello world!' }));

module.exports = route;

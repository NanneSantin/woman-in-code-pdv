const knex = require('../connection');
const jwt = require('jsonwebtoken');

const validateAuthentication = async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ message: 'Não autorizado.' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.SENHA_HASH);

    const userFound = await knex('usuarios').where({ id });

    if (userFound.length < 1) {
      return response.status(401).json({ message: 'Usuário não encontrado.' })
    }

    request.user = userFound[0];

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ message: 'Token inválido!' });
    }

    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ message: 'Token expirado!' });
    }

    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = validateAuthentication;

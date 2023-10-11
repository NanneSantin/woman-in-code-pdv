const knex = require('../connection');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJWT');

const authentication = async (request, response, next) => {
    try {
        const { authorization } = request.headers;

        if (!authorization) {
            return response.status(401).json({ message: 'Não autorizado.' });
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, senhaJwt);

        const userFound = await knex('usuarios').where({ id });

        if (userFound.length < 1) {
            return response.status(401).json({ message: 'Usuário não encontrado :/' })
        }

        const { senha: _, ...usuario } = userFound[0];

        request.userID = id;

        request.usuario = usuario;

        next();

    } catch (error) {
        return response.status(401).json({ message: 'Não autorizado.' })
    }
}

module.exports = {
    authentication
}
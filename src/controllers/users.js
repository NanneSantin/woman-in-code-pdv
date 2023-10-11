const knex = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJWT');

const registerUser = async (request, response) => {
    const { nome, email, senha } = request.body

    try {
        const emailAlreadyExists = await knex('usuarios').where({ email }).first();

        if (emailAlreadyExists) {
            return response.status(400).json({ message: 'Este e-mail já está sendo utilizado por outro usuário.' });
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const insertUser = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(["id", "nome", "email"]);

        return response.status(201).json(insertUser[0]);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const loginUser = async (request, response) => {
    const { email, senha } = request.body;

    try {
        const usuario = await knex('usuarios').where({ email });

        if (usuario.length < 1) {
            return response.status(404).json({ message: 'Usuário não encontrado' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario[0].senha);

        if (!senhaValida) {
            response.status(400).json({ message: 'Email e/ou senha inválido(s).' })
        }

        const { id } = usuario[0];
        const token = jwt.sign({ id }, senhaJwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario[0];

        response.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {
        return response.status(401).json({ message: 'Usuário e/ou senha inválido(s).' })
    }
}

const detailUser = async (request, response) => {
    try {
        const { id, nome, email } = request.usuario;
        return response.status(200).json({ id, nome, email });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    detailUser
}
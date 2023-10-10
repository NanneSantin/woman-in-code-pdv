const knex = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async(request, response) => {
    const { nome, email, senha } = request.body

    try {
        const emailAlreadyExists = await knex('usuarios').where({email}).first();

        if(emailAlreadyExists){
            return response.status(400).json({ mensagem: 'Este e-mail já está sendo utilizado por outro usuário.'});
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const insertUser = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(["id", "nome", "email"]);
        
        return response.status(201).json(insertUser[0]);
    } catch (error) {
        return response.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    registerUser
}
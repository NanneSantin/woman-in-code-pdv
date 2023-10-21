const knex = require('../connection');

const registerCustomer = async (request, response) => {
    try {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = request.body

        const emailAlreadyExists = await knex('clientes').where({ email }).first();

        if (emailAlreadyExists) {
            return response.status(409).json({ message: 'Ocorreu um problema ao cadastrar o email. Por favor, escolha outro ou tente fazer login.' });
        }

        const cpfAlreadyExists = await knex('clientes').where({ cpf }).first();

        if (cpfAlreadyExists) {
            return response.status(409).json({ message: 'Ocorreu um problema ao cadastrar o cpf. Por favor, escolha outro ou tente fazer login.' });
        }

        const insertCustomer = await knex('clientes').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).returning(["id", "nome", "email", "cpf"]);

        return response.status(201).json(insertCustomer[0]);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}
module.exports = {
    registerCustomer
}
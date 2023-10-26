const knex = require('../connection');

const registerCustomer = async (request, response) => {
    try {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = request.body

        const emailAlreadyExists = await knex('clientes').where({ email }).first();

        if (emailAlreadyExists) {
            return response.status(409).json({ message: 'E-mail já está sendo utilizado em outro cadastro.' });
        }

        const cpfAlreadyExists = await knex('clientes').where({ cpf }).first();

        if (cpfAlreadyExists) {
            return response.status(409).json({ message: 'CPF já cadastrado.' });
        }

        const insertCustomer = await knex('clientes').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).returning(['id', 'nome', 'email']);

        return response.status(201).json(insertCustomer[0]);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

const updateCustomer = async (request, response) => {
    try {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = request.body
        const { id } = request.params

        const emailAlreadyExists = await knex('clientes').where({ email }).first();

        if (emailAlreadyExists && emailAlreadyExists.id != id) {
            return response.status(409).json({
                message: 'E-mail já está sendo utilizado em outro cadastro.',
            });
        }

        const cpfAlreadyExists = await knex('clientes').where({ cpf }).first();

        if (cpfAlreadyExists && cpfAlreadyExists.id != id) {
            return response.status(409).json({ message: 'CPF já cadastrado.' });
        }

        const updatedCustomer = await knex('clientes')
            .where({ id })
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning(['id', 'nome', 'email']);

        return response.status(200).json(updatedCustomer[0]);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

const listCustomers = async (request, response) => {
    try {
        const list = await knex('clientes').select('id', 'nome', 'email', 'cpf').orderBy('id', 'asc');

        return response.status(200).json(list);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

const detailCustomer = async (request, response) => {
    try {
        const id = request.params.id;

        const customer = await knex('clientes').where('id', id).first();

        return response.status(200).json(customer);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

module.exports = {
    registerCustomer,
    updateCustomer,
    listCustomers,
    detailCustomer
}
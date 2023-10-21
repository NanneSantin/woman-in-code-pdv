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

        // const addressData = await getAddress(cep);
        // addressHandler

        // const addressFormated = formatAddress(addressData);

        // const encryptedPassword = await bcrypt.hash(senha, 10);

        const insertCustomer = await knex('clientes').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).returning(['id', 'nome', 'email']);

        return response.status(201).json(insertCustomer[0]);
    } catch (error) {
        console.log(error);
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
                message: 'Ocorreu um problema ao atualizar o email. Por favor, escolha outro!',
            });
        }

        const cpfAlreadyExists = await knex('clientes').where({ cpf }).first();


        if (cpfAlreadyExists && cpfAlreadyExists.id != id) {
            return response.status(409).json({ message: 'Ocorreu um problema ao cadastrar o cpf. Por favor, escolha outro ou tente fazer login.' });
        }

        const updatedCustomer = await knex('clientes')
            .where({ id })
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning(['id', 'nome', 'email']);

        return response.status(200).json(updatedCustomer[0]);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    registerCustomer,
    updateCustomer
}
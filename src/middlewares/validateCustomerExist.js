const knex = require('../connection')

const validateCustomerExist = async (request, response, next) => {
    try {

        const { id } = request.params

        const customerExist = await knex('clientes').where({ id }).first();

        if (!customerExist) {
            return response.status(404).json({ mensagem: "Nenhum cliente com esse ID foi encontrado" });
        }

        next();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = validateCustomerExist;
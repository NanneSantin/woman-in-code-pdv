const knex = require('../connection')

const validateCustomerExist = async (request, response, next) => {
    try {
        const { cliente_id: cliente_id_body } = request.body;
        const { id: cliente_id_params } = request.params;

        const id = cliente_id_body ? cliente_id_body : cliente_id_params;

        const customerExist = await knex('clientes').where({ id }).first();

        if (!customerExist) {
            return response.status(404).json({ mensagem: 'Nenhum cliente com esse ID foi encontrado.' });
        }

        next();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = validateCustomerExist;
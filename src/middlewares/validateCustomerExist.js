const knex = require('../connection')

const validateCustomerExist = async (request, response, next) => {
    try {
        const { cliente_id: cliente_id_body } = request.body;
        const { cliente_id: cliente_id_query } = request.query;
        const { id: cliente_id_params } = request.params;

        let id;
        if (cliente_id_body) {
            id = cliente_id_body;
        } else if (cliente_id_query) {
            id = cliente_id_query;
        } else {
            id = cliente_id_params;
        }

        const customerExist = await knex('clientes').where({ id }).first();

        if (!customerExist) {
            return response.status(404).json({ mensagem: 'Nenhum cliente com esse ID foi encontrado.' });
        }

        next();
    } catch (error) {
        console.log('Quebrou na validação do cliente', error.message);
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = validateCustomerExist;
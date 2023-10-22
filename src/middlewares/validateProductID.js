const knex = require('../connection');

const validateProductIdExist = async (request, response, next) => {
    try {
        const id = request.params.id;

        const product = await knex('produtos').where('id', id).first();

        if (!product) {
            return response.status(404).json({ message: 'Não existe um produto com o ID informado.' })
        }

        request.product = product;

        next();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

module.exports = validateProductIdExist;
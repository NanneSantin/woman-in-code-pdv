const knex = require('../connection');

const listCategories = async (request, response) => {
    try {
        const categories = await knex.select('categoria').from('categorias');

        return response.status(200).json(categories);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = listCategories;

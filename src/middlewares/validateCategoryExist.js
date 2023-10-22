const knex = require('../connection')

const validateCategoryExist = async (request, response, next) => {
    try {
        const { categoria_id: categoria_id_body } = request.body
        const { categoria_id: categoria_id_query } = request.query

        const categories = categoria_id_body ? categoria_id_body : categoria_id_query;

        if (categoria_id_query || categoria_id_body) {

            if (Array.isArray(categoria_id_query)) {
                const searchCategory = await Promise.all(categoria_id_query.map(async (category) => {
                    const categoryId = parseInt(category, 10);

                    const categoryList = await knex('categorias').where({ id: categoryId }).first();

                    if (categoryList) {
                        return true
                    } else {
                        return false
                    }
                }));

                const validateCategories = searchCategory.every((category) => category === true);

                if (!validateCategories) {
                    return response.status(404).json({ mensagem: 'Uma ou mais categoria informada não foi encontrada' });
                }

                next();
                return
            }

            const categoriesExist = await knex('categorias').where({ id: categories }).first();

            if (!categoriesExist) {
                return response.status(404).json({ mensagem: 'Nenhuma categoria encontrada' });
            }

            next();
            return
        }

        next();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = validateCategoryExist
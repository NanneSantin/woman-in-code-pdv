const knex = require('../connection')

const validateCategoryExist = async(request, response, next) => {
    try {
        const { categoria_id: categoria_id_body } = request.body
        const { categoria_id: categoria_id_query } = request.query

        if(!categoria_id_query){
            next();
            return;
        }

        const categories = categoria_id_body ? categoria_id_body : categoria_id_query;

        const categoriesExist = await knex('categorias').where({ id: categories }).first();

        if(!categoriesExist){
            return response.status(404).json({ mensagem: "Nenhuma categoria encontrada"});
        }

        next();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = validateCategoryExist
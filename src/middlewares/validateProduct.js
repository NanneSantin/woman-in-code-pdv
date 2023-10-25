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

const validateProductsOrder = async (request, response, next) => {
    try {
        const { pedido_produtos } = request.body;

        pedido_produtos.map(async productInOrder => {
            const product = await knex('produtos').where('id', productInOrder.produto_id).first();

            if (!product) {
                return response.status(404).json({ message: 'Não existe um produto com o ID informado.' });
            }
        });

        next();

    } catch (error) {
        return response.status(404).json({ message: 'Erro interno do servidor' });
    }
}

const validateProductsStock = async (request, response, next) => {
    try {
        const { pedido_produtos } = request.body;

        const promises = pedido_produtos.map(async productInOrder => {
            const product = await knex('produtos').where('id', productInOrder.produto_id).first();

            const stock = product.quantidade_estoque - productInOrder.quantidade_produto;

            if (stock < 0) {
                return false;
            }

            return true;
        });

        const results = await Promise.all(promises);

        if (results.includes(false)) {
            return response.status(400).json({ message: 'Não existe produtos suficientes no estoque.' });
        }

        next();

    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = {
    validateProductIdExist,
    validateProductsOrder,
    validateProductsStock
}
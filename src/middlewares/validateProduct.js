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
                return response.status(404).json({ message: 'Um ou mais produtos informados não foram encontrados.' });
            }
        });

        next();
    } catch (error) {
        console.log('Quebrou na validação dos produtos', error.message);
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
        console.log('Quebrou na validacao do estoque', error.message);
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
}

const checkIfProductIsInOrders = async (request, response, next) => {
    const productId = request.params.id;

    try {
        const order = await knex('pedido_produtos').where('produto_id', productId);

        if (order.length > 0) {
            return response.status(400).json({ message: 'Este produto não pode ser excluído. Por favor, verifique se ele está vinculado a um pedido.' });
        }

        next();

    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = {
    validateProductIdExist,
    validateProductsOrder,
    validateProductsStock,
    checkIfProductIsInOrders
}
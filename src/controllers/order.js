const knex = require('../connection');
const send = require('../services/nodemailer');
const compilerHtml = require('../utils/compiler');

const registerOrder = async (request, response) => {
    try {
        const { cliente_id, observacao, pedido_produtos } = request.body;

        const insertOrder = await knex('pedidos').insert({ cliente_id, observacao, valor_total: 0 }).returning('*');

        const mapping = pedido_produtos.map(async (product) => {
            const productCost = await knex('produtos').where('id', product.produto_id).select('valor').first();

            await knex('pedido_produtos').insert({ pedido_id: insertOrder[0].id, produto_id: product.produto_id, quantidade_produto: product.quantidade_produto, valor_produto: productCost.valor }).returning('*');

            return { valor: productCost.valor, id: product.produto_id }
        });

        const results = await Promise.all(mapping);

        let totalCost = 0;
        pedido_produtos.forEach(product => {
            const found = results.find(result => product.produto_id === result.id);
            totalCost = found ? totalCost + (found.valor * product.quantidade_produto) : totalCost;
        });

        await knex('pedidos').where('id', insertOrder[0].id).update('valor_total', totalCost);

        pedido_produtos.forEach(async product => {
            const stock = await knex('produtos').where('id', product.produto_id).select('quantidade_estoque').first();
            const updatedStock = stock.quantidade_estoque - product.quantidade_produto;
            await knex('produtos').where('id', product.produto_id).update('quantidade_estoque', updatedStock);
        });

        const client = await knex('clientes').where('id', cliente_id).first();

        const html = await compilerHtml('./src/template/email.html', {
            userName: client.nome,
            id: insertOrder[0].id
        })

        send(client.email, `Status do Pedido ${insertOrder[0].id}`, html)

        return response.status(201).send();
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    registerOrder
}
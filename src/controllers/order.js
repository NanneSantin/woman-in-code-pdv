const knex = require('../connection');
const send = require('../services/nodemailer');
const compilerHtml = require('../utils/compiler');

const registerOrder = async (request, response) => {
  try {
    const { cliente_id, observacao, pedido_produtos } = request.body;

    const insertOrder = await knex('pedidos')
      .insert({ cliente_id, observacao, valor_total: 0 })
      .returning('*');

    const mapping = pedido_produtos.map(async (product) => {
      const productCost = await knex('produtos')
        .where('id', product.produto_id)
        .select('valor')
        .first();

      await knex('pedido_produtos')
        .insert({
          pedido_id: insertOrder[0].id,
          produto_id: product.produto_id,
          quantidade_produto: product.quantidade_produto,
          valor_produto: productCost.valor,
        })
        .returning('*');

      return { valor: productCost.valor, id: product.produto_id };
    });

    const results = await Promise.all(mapping);

    let totalCost = 0;
    pedido_produtos.forEach((product) => {
      const found = results.find((result) => product.produto_id === result.id);
      totalCost = found
        ? totalCost + found.valor * product.quantidade_produto
        : totalCost;
    });

    await knex('pedidos')
      .where('id', insertOrder[0].id)
      .update('valor_total', totalCost);

    pedido_produtos.forEach(async (product) => {
      const stock = await knex('produtos')
        .where('id', product.produto_id)
        .select('quantidade_estoque')
        .first();
      const updatedStock =
        stock.quantidade_estoque - product.quantidade_produto;
      await knex('produtos')
        .where('id', product.produto_id)
        .update('quantidade_estoque', updatedStock);
    });

    const client = await knex('clientes').where('id', cliente_id).first();

    const products = await knex
      .select(
        'pedidos.id',
        'produtos.descricao',
        'pedido_produtos.quantidade_produto',
        'produtos.valor'
      )
      .from('pedido_produtos')
      .innerJoin('produtos', 'pedido_produtos.produto_id', 'produtos.id')
      .innerJoin('pedidos', 'pedido_produtos.pedido_id', 'pedidos.id')
      .groupBy(
        'pedidos.id',
        'produtos.descricao',
        'pedido_produtos.quantidade_produto',
        'produtos.valor'
      )
      .where({ pedido_id: insertOrder[0].id });



    const newListProducts = products.map((product) => ({
      produto: product.descricao,
      quantidade: product.quantidade_produto,
      valor_unitario: product.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      total: (product.quantidade_produto * product.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    }));

    const html = await compilerHtml('./src/template/email.html', {
      userName: client.nome,
      id: insertOrder[0].id,
      pedido_produtos: newListProducts,
      valor_total: totalCost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    });

    send(client.email, `Status do Pedido ${insertOrder[0].id}`, html);

    return response.status(201).send();
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const listOrders = async (request, response) => {
  try {
    const { cliente_id } = request.query;
    const ordersList = [];

    if (cliente_id) {
      query = knex('pedidos')
        .select('id as pedido_id', 'valor_total', 'observacao', 'cliente_id')
        .where('cliente_id', cliente_id);
    } else {
      query = knex('pedidos').select(
        'id as pedido_id',
        'valor_total',
        'observacao',
        'cliente_id'
      );
    }

    const orders = await query;

    for (const order of orders) {
      const products = await knex('pedido_produtos')
        .where('pedido_id', order.pedido_id)
        .select(
          'id as produto_id',
          'quantidade_produto',
          'valor_produto',
          'pedido_id',
          'produto_id'
        );

      ordersList.push({
        pedido: {
          id: order.pedido_id,
          valor_total: order.valor_total,
          observacao: order.observacao,
          cliente_id: order.cliente_id,
        },
        pedido_produtos: products,
      });
    }

    return response.status(200).json(ordersList);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = {
  registerOrder,
  listOrders
}

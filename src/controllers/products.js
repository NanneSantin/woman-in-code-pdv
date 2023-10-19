const knex = require("../connection");

const registerProduct = async (request, response) => {
    try {
        const { descricao, quantidade_estoque, valor, categoria_id } = request.body

        const productExist = await knex('produtos').where({ descricao }).returning('*').first();

        if(productExist){
            return response.status(409).json({ mensagem: "Produto já cadastrado."});
        }

        const insertProduct = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');

        return response.status(201).json(insertProduct[0]);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

const updateProduct = async(request, response) => {
    try {
        const { descricao, quantidade_estoque, valor, categoria_id } = request.body
        const { id } = request.params

        //*quando a criação do middleware -validar se produto existe- for feita, atualizar esta rota
        //*
        const productExist = await knex('produtos').where({ id }).returning('*').first();

        if(!productExist){
            return response.status(404).json({ mensagem: "Produto não encontrado."});
        }
        //*

        const descriptionExist = await knex('produtos').where({ descricao }).andWhere('id', '!=', id).returning('*').first();

        if(descriptionExist){
            return response.status(409).json({ mensagem: "Produto já cadastrado."});
        }

        const updatedProduct = await knex('produtos')
        .where({ id })
        .update({ descricao, quantidade_estoque, valor, categoria_id })
        .returning('*');

        return response.status(200).json(updatedProduct[0]);
    } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    registerProduct,
    updateProduct
}
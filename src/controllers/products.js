const knex = require("../connection");

const registerProduct = async (request, response) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = request.body;

    const productExist = await knex("produtos")
      .where({ descricao })
      .returning("*")
      .first();

    if (productExist) {
      return response.status(409).json({ mensagem: "Produto já cadastrado." });
    }

    const insertProduct = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");

    return response.status(201).json(insertProduct[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateProduct = async (request, response) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = request.body;
    const { id } = request.params;

    //*quando a criação do middleware -validar se produto existe- for feita, atualizar esta rota
    //*
    const productExist = await knex("produtos")
      .where({ id })
      .returning("*")
      .first();

    if (!productExist) {
      return response.status(404).json({ mensagem: "Produto não encontrado." });
    }
    //*

    const descriptionExist = await knex("produtos")
      .where({ descricao })
      .andWhere("id", "!=", id)
      .returning("*")
      .first();

    if (descriptionExist) {
      return response.status(409).json({ mensagem: "Produto já cadastrado." });
    }

    const updatedProduct = await knex("produtos")
      .where({ id })
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");

    return response.status(200).json(updatedProduct[0]);
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

const removeProduct = async (request, response) => {
  const { id } = request.params;
  try {
    //*quando a criação do middleware -validar se produto existe- for feita, atualizar esta rota
    //*
    const productExist = await knex("produtos")
      .where({ id })
      .returning("*")
      .first();

    if (!productExist) {
      return response.status(404).json({ mensagem: "Produto não encontrado." });
    }
    //*
    const deleteProduct = await knex("produtos")
      .where({ id })
      .delete()
      .returning("*");

    return response
      .status(200)
      .json({ mensagem: "Produto excluído com sucesso!" });
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

const detailProduct = async (request, response) => {
  const { id } = request.params;
  try {
    //*quando a criação do middleware -validar se produto existe- for feita, atualizar esta rota
    //*
    const productExist = await knex("produtos")
      .where({ id })
      .returning("*")
      .first();

    if (!productExist) {
      return response.status(404).json({ mensagem: "Produto não encontrado." });
    }
    //*

    return response.status(200).json(productExist);
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

const listProducts = async (request, response) => {
  const { categoria_id } = request.query;
  let productList;
  try {
    const query = knex("produtos");
    if (!categoria_id) {
      const productList = await query.select("*");
      return response.status(200).json(productList);
    }
    if (!Array.isArray(categoria_id)) {
      query.where("categoria_id", categoria_id);
      productList = await query.select("*");
    }
    if (Array.isArray(categoria_id) && categoria_id.length > 0) {
      const categoria_ids = categoria_id.map((str) => {
        return parseInt(str, 10);
      });
      query.whereIn("categoria_id", categoria_ids);
      productList = await query.select("*");
    }
    if (productList.length == 0) {
      return response.status(200).json({
        mensagem: "Não existem produtos cadastrados nessa(s) categoria(s).",
      });
    }
    return response.status(200).json(productList);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  registerProduct,
  updateProduct,
  removeProduct,
  detailProduct,
  listProducts,
};

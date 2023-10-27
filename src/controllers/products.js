const knex = require('../connection');
const { uploadFile, removeFile } = require('../storage')

const registerProduct = async (request, response) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = request.body;
    const produto_imagem = request.file

    const productExist = await knex('produtos')
      .where({ descricao })
      .returning('*')
      .first();

    if (productExist) {
      return response.status(409).json({ mensagem: 'Produto já cadastrado.' });
    }

    const insertProduct = await knex('produtos')
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning('*');

    if (produto_imagem) {
      try {
        const image = produto_imagem.originalname.split(' ').join('-');
        const id_product = insertProduct[0].id

        const imageProduct = await uploadFile(
          `products/${id_product}/${image}`,
          produto_imagem.buffer,
          produto_imagem.mimetype
        )

        const updateImage = await knex('produtos').update('produto_imagem', imageProduct.produto_imagem).where('id', id_product).returning('*');

        return response.status(201).json(updateImage[0]);
      } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
      }
    }

    return response.status(201).json(insertProduct[0]);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const updateProduct = async (request, response) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = request.body;
    const { id } = request.params;
    const produto_imagem = request.file;

    const descriptionExist = await knex('produtos')
      .where({ descricao })
      .andWhere('id', '!=', id)
      .returning('*')
      .first();

    if (descriptionExist) {
      return response.status(409).json({ mensagem: 'Produto já cadastrado.' });
    }

    if (produto_imagem) {
      try {
        const image = produto_imagem.originalname.split(' ').join('-');

        const product = await knex('produtos')
          .where({ id })
          .first();


        if (product.produto_imagem !== null) {
          const pathIndex = product.produto_imagem.indexOf(product.id);
          const path = product.produto_imagem.slice(pathIndex);
          await removeFile(`products/${path}`);
        }

        const imageProduct = await uploadFile(
          `products/${id}/${image}`,
          produto_imagem.buffer,
          produto_imagem.mimetype
        )

        const updateImage = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imageProduct.produto_imagem }).where({ id }).returning('*');

        return response.status(201).json(updateImage[0]);
      } catch (error) {
        return response.status(500).json({ message: 'Erro interno do servidor.' });
      }
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

const removeProduct = async (request, response) => {
  try {
    const { id } = request.params;

    const productDelete = await knex('produtos')
      .where({ id })
      .delete()
      .returning('*');

    if (productDelete.produto_imagem !== null) {
      const pathIndex = productDelete[0].produto_imagem.indexOf(productDelete[0].id)
      const path = productDelete[0].produto_imagem.slice(pathIndex)
      await removeFile(`products/${path}`);
    }

    return response
      .status(200)
      .json({ mensagem: 'Produto excluído com sucesso!' });
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const detailProduct = async (request, response) => {
  try {
    const { id } = request.params;

    const productDetails = await knex('produtos')
      .where({ id })
      .returning('*')
      .first();

    return response.status(200).json(productDetails);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const listProducts = async (request, response) => {
  try {
    const { categoria_id } = request.query;

    let productList;

    const query = knex('produtos');

    if (!categoria_id) {
      const productList = await query.select('*').orderBy('id', 'asc');

      return response.status(200).json(productList);
    }

    if (!Array.isArray(categoria_id)) {
      query.where('categoria_id', categoria_id);
      productList = await query.select('*').orderBy('id', 'asc');
    }

    if (Array.isArray(categoria_id) && categoria_id.length > 0) {
      const categoria_ids = categoria_id.map((str) => {
        return parseInt(str, 10);
      });

      query.whereIn('categoria_id', categoria_ids);
      productList = await query.select('*').orderBy('id', 'asc');
    }

    if (productList.length == 0) {
      return response.status(200).json({
        mensagem: 'Não existem produtos cadastrados nessa(s) categoria(s).'
      });
    }

    return response.status(200).json(productList);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = {
  registerProduct,
  updateProduct,
  removeProduct,
  detailProduct,
  listProducts,
}

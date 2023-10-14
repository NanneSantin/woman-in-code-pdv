const knex = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async (request, response) => {
  try {
    const { nome, email, senha } = request.body
    const emailAlreadyExists = await knex('usuarios').where({ email }).first();

    if (emailAlreadyExists) {
      return response.status(409).json({ message: 'Ocorreu um problema ao cadastrar o email. Por favor, escolha outro ou tente fazer login.' });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const insertUser = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(["id", "nome", "email"]);

    return response.status(201).json(insertUser[0]);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const detailUser = async (request, response) => {
  try {
    const { id, nome, email } = request.user;

    return response.status(200).json({ id, nome, email });
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

const updateUser = async (request, response) => {
  try {
    const { nome, email, senha } = request.body;
    const { id } = request.user;

    const emailAlreadyExists = await knex('usuarios').where({ email }).first();

    if (emailAlreadyExists && emailAlreadyExists.id !== id) {
      return response.status(409).json({
        message: 'Ocorreu um problema ao atualizar o email. Por favor, escolha outro!',
      });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const updatedUser = await knex('usuarios')
      .where({ id })
      .update({ nome, email, senha: encryptedPassword })
      .returning(['id', 'nome', 'email']);

    return response.status(200).json(updatedUser[0]);
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  registerUser,
  detailUser,
  updateUser,
};

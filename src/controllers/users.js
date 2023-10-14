const knex = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async (request, response) => {
  const { nome, email, senha } = request.body

  try {
    const emailAlreadyExists = await knex('usuarios').where({ email }).first();

    if (emailAlreadyExists) {
      return response.status(409).json({ message: 'Este e-mail já está sendo utilizado por outro usuário.' });
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
  const { nome, email, senha } = request.body;
  const { id } = request.user;

  console.log(id);
  try {
    const emailAlreadyExists = await knex("usuarios").where({ email }).first();
    //  console.log(emailAlreadyExists);

    if (emailAlreadyExists && emailAlreadyExists.id !== id) {
      return response.status(409).json({
        message: "Este e-mail já está sendo utilizado por outro usuário.",
      });
    }
    const encryptedPassword = await bcrypt.hash(senha, 10);

    const updatedUser = await knex("usuarios")
      .where({ id })
      .update({ nome, email, senha: encryptedPassword })
      .returning(["id", "nome", "email"]);

    return response.status(201).json(updatedUser[0]);
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  registerUser,
  detailUser,
  updateUser,
};

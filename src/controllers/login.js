const knex = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = async (request, response) => {
  const { email, senha } = request.body;
  try {
    const userFound = await knex("usuarios").where({ email });
    const user = userFound[0];

    if (userFound.length < 1) {
      return response
        .status(401)
        .json({ message: "Email e/ou senha inválido(s)." });
    }

    const validatePass = await bcrypt.compare(senha, user.senha);

    if (!validatePass) {
      return response
        .status(401)
        .json({ message: "Email e/ou senha inválido(s)." });
    }

    const token = jwt.sign({ id: user.id }, process.env.SENHA_HASH, {
      expiresIn: "8h",
    });
    const { senha: _, ...userLoggedIn } = user;

    response.status(200).json({ usuario: userLoggedIn, token });
  } catch (error) {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = authenticateUser;

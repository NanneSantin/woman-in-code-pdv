const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'O campo e-mail é obrigatório!',
    'string.empty': 'O campo e-mail é obrigatório!',
    'string.email': 'E-mail e/ou senha inválido (s).',
    'string.base': 'E-mail e/ou senha inválido (s).'
  }),
  senha: Joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório!',
    'string.empty': 'O campo senha é obrigatório!',
    'string.base': 'E-mail e/ou senha inválido (s).'
  })
});

module.exports = loginSchema;

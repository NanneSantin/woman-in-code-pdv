const Joi = require('joi');

const customerSchema = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório!',
    'string.empty': 'O campo nome é obrigatório!',
    'string.base': 'O campo nome deve ser do tipo texto!'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'O campo e-mail é obrigatório!',
    'string.empty': 'O campo e-mail é obrigatório!',
    'string.email': 'O campo e-mail precisa ter um formato válido.',
    'string.base': 'O campo e-mail precisa ter um formato válido.'
  }),
  cpf: Joi.string().pattern(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/).required().messages({
    'any.required': 'O campo CPF é obrigatório!',
    'string.empty': 'O campo CPF é obrigatório!',
    'string.pattern.base': 'O campo CPF deve estar no formato "999.999.999-99", pontos e traço!'
  }),
  cep: Joi.number().optional(),
  rua: Joi.string().optional(),
  numero: Joi.number().optional(),
  bairro: Joi.string().optional(),
  cidade: Joi.string().optional(),
  estado: Joi.string().optional()
});

module.exports = customerSchema;
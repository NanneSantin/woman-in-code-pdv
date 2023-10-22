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
    'string.base': 'O campo CPF deve ser do tipo texto!',
    'string.pattern.base': 'O campo CPF deve estar no formato "999.999.999-99", pontos e traço!'
  }),
  cep: Joi.number().optional().min(10000000).max(99999999).messages({
    'number.max': "O CEP deve conter 8 digitos.",
    'number.min': "O CEP deve conter 8 digitos."
  }),
  rua: Joi.string().optional().messages({
    'string.base': 'A rua deve ser do tipo texto!'
  }),
  numero: Joi.number().optional(),
  bairro: Joi.string().optional().messages({
    'string.base': 'O bairro deve ser do tipo texto!'
  }),
  cidade: Joi.string().optional().messages({
    'string.base': 'A cidade deve ser do tipo texto!'
  }),
  estado: Joi.string().length(2).optional().messages({
    'string.base': 'O Estado deve ser do tipo texto!',
    'string.length': 'Informe a sigla do Estado.'
  })
});

module.exports = customerSchema;
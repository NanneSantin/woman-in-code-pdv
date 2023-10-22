const Joi = require('joi');

const productSchema = Joi.object({
    descricao: Joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório!',
        'string.empty': 'O campo descrição é obrigatório!',
        'string.base': 'O campo descrição deve ser do tipo texto!'
    }),
    quantidade_estoque: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo quantidade de estoque é obrigatório!',
        'number.base': 'O campo quantidade de estoque deve ser um número!',
        'number.positive': 'O campo quantidade de estoque deve ser um número positivo'
    }),
    valor: Joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório!',
        'number.base': 'O campo valor deve ser um número!',
        'number.positive': 'O campo valor deve ser um número positivo'
    }),
    categoria_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo categoria ID é obrigatório!',
        'number.base': 'O campo categoria ID deve ser um número!',
        'number.positive': 'O campo categoria ID deve ser um número positivo'
    })
});

module.exports = productSchema;
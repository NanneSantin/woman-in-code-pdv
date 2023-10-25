const Joi = require('joi');

const orderSchema = Joi.object({
    cliente_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório!',
        'number.base': 'O campo cliente_id deve ser um número!',
        'number.positive': 'O campo cliente_id deve ser um número positivo'
    }),
    observacao: Joi.string().messages({
        'string.base': 'O campo observacao deve ser uma string!'
    }),
    pedido_produtos: Joi.array().min(1).items({
        produto_id: Joi.number().required().messages({
            'any.required': 'O campo cliente_id é obrigatório!',
            'number.base': 'O campo cliente_id deve ser um número!'
        }), quantidade_produto: Joi.number().required().messages({
            'any.required': 'O campo cliente_id é obrigatório!',
            'number.base': 'O campo cliente_id deve ser um número!'
        })
    }).messages({
        'array.base': 'O pedido_produtos precisar ser um array.',
        'array.min': 'É necessário ter pelo menos 1 produto no pedido.',
        'array.ref': 'É necessário ter pelo menos 1 produto no pedido.',
        'array.includes': '1Espera-se que os valores produto_id e quantidade_produto estejam presentes no array.',
        'array.includesRequiredUnknowns': '2Espera-se que os valores produto_id e quantidade_produto estejam presentes no array.'
    })
});

module.exports = orderSchema;
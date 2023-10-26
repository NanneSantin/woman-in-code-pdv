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
    pedido_produtos: Joi.array().min(1).required().items({
        produto_id: Joi.number().required().messages({
            'any.required': 'O id do produto é obrigatório!',
            'number.base': 'O id do produto deve ser um número!'
        }), quantidade_produto: Joi.number().min(1).positive().required().messages({
            'any.required': 'O quantidade do produto deve ser maior que zero!',
            'number.base': 'O campo quantidade deve ser um número!',
            'number.positive': 'A quantidade deve ser maior que zero!',
            'number.min': 'A quantidade deve ser maior que zero!'
        })
    }).messages({
        'any.required': 'Seu carrinho está vazio!',
        'array.base': 'O pedido_produtos precisar ser um array.',
        'array.min': 'É necessário ter pelo menos 1 produto no pedido.',
        'array.ref': 'É necessário ter pelo menos 1 produto no pedido.',
        'array.includes': '1Espera-se que os valores produto_id e quantidade_produto estejam presentes no array.',
        'array.includesRequiredUnknowns': '2Espera-se que os valores produto_id e quantidade_produto estejam presentes no array.'
    })
});

module.exports = orderSchema;
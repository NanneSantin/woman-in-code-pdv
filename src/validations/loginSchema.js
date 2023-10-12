const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo e-mail é obrigátorio!',
        'string.empty': 'O campo e-mail é obrigátorio!',
        'string.email': 'E-mail e/ou senha inválido (s).',
        'string.base': 'E-mail e/ou senha inválido (s).'
    }),
    senha: Joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigátorio!',
        'string.empty': 'O campo senha é obrigátorio!',
        'string.base': 'E-mail e/ou senha inválido (s).',
        'string.min': 'E-mail e/ou senha inválido (s).'
    })
});

module.exports = loginSchema;

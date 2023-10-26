const send = require('../services/nodemailer');
const compilerHtml = require("../utils/compiler");

const envioDeEmail = async (request, response) => {
    try {
        const html = await compilerHtml('./src/template/email.html', {
            userName: 'elaine',
            id: '1',
            pedido_produtos: {
                produto: 'Coca',
                quantidade: 1,
                valor_unitario: 3.99,
                total: 3.9
            },
            valor_total: 3.99
        });

        const email = 'elaine.s.santin@gmail.com'

        send(email, `Status do Pedido`, html);
        response.status(200).send();
    } catch (error) {
        return response.status(500).json(error.message)
    }
}

module.exports = envioDeEmail;


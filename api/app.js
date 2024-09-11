require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST2,
    port: process.env.MAIL_PORT2,
    secure: false,
    auth: {
        user: process.env.MAIL_USER2,
        pass: process.env.MAIL_PASS2
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Middleware para permitir o CORS e processar os dados dos formulários
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Função para enviar e-mail
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'luccapinz@essencial.com.br', // Seu e-mail
        to: to,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};

// Rota para processar ambos os formulários
app.post('/api/formulario', async (req, res) => {
    const { formType, ...data } = req.body;

    let subject = '';
    let text = '';

    switch (formType) {
        case 'orcamento':
            subject = 'Novo Pedido de Orçamento';
            text = `Formulário de Orçamento Recebido:\n
            \nNome: ${data.nome}
            \nNome da Empresa: ${data.nomeEmpresa}
            \nEmail: ${data.email}
            \nTelefone: ${data.telefone}
            \nMensagem: ${data.mensagem}`;
            break;

        case 'lgpd':
            subject = 'Nova Solicitação LGPD';
            text = `Formulário LGPD Recebido:\n
            CHECKBOX:
            \nTitular de Dados: ${data.titularDados ? 'Sim' : 'Não'}
            \nEx-Funcionário: ${data.exFunc ? 'Sim' : 'Não'}
            \nAcesso aos Dados: ${data.acessoDados ? 'Sim' : 'Não'}
            \nPedido de Exclusão: ${data.pedidoExclusao ? 'Sim' : 'Não'}
            \nAtualização dos Dados: ${data.atualizacaoDados ? 'Sim' : 'Não'}
            \nTITULAR DOS DADOS:
            \nNome: ${data.nome}\nEmail: ${data.email}\nCPF: ${data.cpf}
            \nData de Nascimento: ${data.dataNascimento}
            \nMensagem Lgpd1: ${data.mensagemLgpd1}
            \nCAMPO DOS RESPONSÁVEIS PELOS DADOS:
            \nNome Responsável: ${data.nomeResponsavel}
            \nEmail Responsável: ${data.emailResponsavel}
            \nCPF Responsável: ${data.cpfResponsavel}
            \nData Nascimento Responsável: ${data.dataNascimentoResponsavel}
            \nMensagem Lgpd2: ${data.mensagemLgpd2}`;
            break;

        default:
            return res.status(400).json({ message: 'Tipo de formulário desconhecido' });
    }

    try {
        await sendEmail('luccapinz@essencial.com.br', subject, text); // Envie para seu e-mail
        res.json({ message: 'Formulário enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


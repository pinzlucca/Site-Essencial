const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const csrf = require('csurf'); // <-- Adicione esta linha
const cookieParser = require('cookie-parser'); // <-- Necessário para o CSRF via cookie

const app = express();
const port = 3000;

// Configuração do Nodemailer (mantenha como está)
const transporter = nodemailer.createTransport({
    host: 'mail.essencial.com.br',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // substitua com seu email
        pass: '' // substitua com sua senha
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Middlewares
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Ou 'http://localhost:5500' (URL do Live Server)
    credentials: true // Permite cookies
  }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // <-- Adicione esta linha

// Configuração do CSRF (usaremos cookie)
const csrfProtection = csrf({ cookie: true });

// Rota para obter o token CSRF (o frontend vai chamar isso)
app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() }); // ← Garanta que isso está sendo chamado
  });

// Rota do formulário (protegida por CSRF)
app.post('/api/formulario', csrfProtection, async (req, res) => {
    // Mantenha o resto do seu código aqui...
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
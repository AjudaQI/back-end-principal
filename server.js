import express from 'express'

const app = express()
app.use(express.json())
const users = []

const checkAuthorization = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || token !== 'Bearer') {
        return res.status(403).json({ message: 'Acesso negado. Token inválido.' });
    }

    next();
};

app.get('/usuarios', (req, res) => {
    res.json(users)
})


app.post('/usuarios', checkAuthorization, (req, res) => {
    const { nome, tipoUsuario, email, materias } = req.body;

    if (!nome || !tipoUsuario || !email || !Array.isArray(materias)) {
        return res.status(400).json({ message: 'Campos obrigatórios estão faltando ou inválidos.' });
    }

    if (tipoUsuario !== 'adm' && tipoUsuario !== 'professor') {
        return res.status(400).json({ message: 'Tipo de usuário inválido.' });
    }const newUser = {
        disciplinas
    };

    users.push(newUser);
    res.status(201).json(newUser);  // Retorna o usuário criado
})


app.put('/usuarios', (req, res) => {
    res.send('Requisição de alteração ok')
})


app.delete('/usuarios', (req, res) => {
    res.send('Requisição de deleção ok')
})

app.listen(3000)
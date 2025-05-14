const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let professores = require('./data');

// 1. Listar todos os professores
app.get('/professores', (req, res) => {
    res.json(professores);
});

// 2. Buscar um professor por ID
app.get('/professores/:id', (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
        if (professor) {
    res.json(professor);
        } else {
    res.status(404).send("Id não existente");
}
});

// 3. Listar turmas de um professor
app.get('/professores/:id/turmas', (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
        if (professor) {
    res.json(professor.turmas);
    } else {
    res.status(404).send("Id não existente");
}
});

// 4. Atualizar dados de um professor
app.put('/professores/:id', (req, res) => {
    const index = professores.findIndex(p => p.id === req.params.id);
        if (index !== -1) {
    const { nome, idade, departamento } = req.body;
        if (nome) professores[index].nome = nome;
        if (idade) professores[index].idade = idade;
        if (departamento) professores[index].departamento = departamento;
    res.json(professores[index]);
        } else {
    res.status(404).send("Id não existente");
}
});

// 5. Adicionar uma turma para um professor
app.post('/professores/:id/turmas', (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
        if (professor) {
    const { codigo, disciplina, alunos } = req.body;
    professor.turmas.push({ codigo, disciplina, alunos });
    res.status(201).json(professor.turmas);
        } else {
    res.status(404).send("Id não existente");
}
});

// 6. Listar professores por departamento
app.get('/professores/departamento/:departamento', (req, res) => {
    const departamento = req.params.departamento.toLowerCase();
    const filtrados = professores.filter(p => p.departamento.toLowerCase() === departamento);
    res.json(filtrados);
});

// 7. Remover um professor
app.delete('/professores/:id', (req, res) => {
    const index = professores.findIndex(p => p.id === req.params.id);
        if (index !== -1) {
    professores.splice(index, 1);
    res.send("Professor removido com sucesso");
        } else {
    res.status(404).send("Id não existente");
}
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
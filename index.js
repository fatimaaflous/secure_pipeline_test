const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = []; // Stockage en mémoire

// Créer un utilisateur
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const id = users.length + 1;
    users.push({ id, name, email });
    res.status(201).json({ id, name, email });
});

// Lire tous les utilisateurs
app.get('/users', (req, res) => {
    res.json(users);
});

// Lire un utilisateur par ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// Mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted" });
});
//le port d'execution d app
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

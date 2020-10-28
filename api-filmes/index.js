const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db-filmes', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar com o MongoDB "+err))

// Middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Model
const Filme = require("./models/filme");

//CRUD
app.get('/filmes', (req, res) => {
    Filme.find()
         .then((data) => {
             res.send(data);
         })
         .catch((err) => {
             console.error(err);
             res.sendStatus(400).send(err);
         });
});

app.get('/filme/:filmeId', function (req, res) {
    const filmeId = req.params.filmeId;
    Filme.findById(filmeId)
         .then((filme) => res.send(filme))
         .catch(() => res.sendStatus(400));
});

app.post('/filme', (req, res) => {
    const filme = req.body;
    if (!filme) {
        res.status(400).send({
            error: "Payload vazio"
        });
        return;
    }

    Filme(filme).save()
         .then(() => {
             res.sendStatus(201);
         })
         .catch((err) => {
             console.error(err);
             res.sendStatus(400).send(err);
         });
})

app.put('/filme/:filmeId', function (req, res) {
    const filmeId = req.params.filmeId;
    const data = req.body;
    if(!data || !filmeId) {
        res.sendStatus(400)
    }
    
    Filme.findByIdAndUpdate(filmeId, data)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});

app.delete('/filme/:idFilme', (req, res) => {
    const idFilme = req.params.idFilme;
    if (!idFilme) {
        res.status(400).send({
            error: "Payload vazio"
        });
        return;
    }

    Filme.findByIdAndRemove(idFilme)
         .then(() => res.sendStatus(200))
         .catch((err) => {
            console.error(err);
            res.sendStatus(400).send(err);
        });
});

app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});
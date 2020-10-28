const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    anoLancamento: {
        type: Number,
        required: true
    },
    diretor: {
        type: String
    }
});

mongoose.model('filmes', FilmeSchema);
module.exports = mongoose.model('filmes');
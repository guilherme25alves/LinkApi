'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type : String,
        required: [true, 'Informe um nome para o produto'],
        trim: true
    },
    codigo: {
        type: Number,
        unique: true
    },
    ingredientes: [{
        type: String,
    }],
    categoria: {
        type: String,
        required: [true, 'Informe uma categoria para o produto'],
        enum: ['Pizza', 'Bebidas', 'Petiscos', 'Sobremesas', 'Outros']
    },
    valor: {
        type: Number,
        type: String
    }
});

module.exports = mongoose.model('Produto', schema);
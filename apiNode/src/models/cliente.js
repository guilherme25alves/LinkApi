'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type : String,
        required: [true, 'Informe um nome para o cliente'],
        trim: true
    },
    telefone: {
        type: String,
        required: [true, 'Informe pelo menos um telefone para o cadastro']
    },
    endereco: {
        type: String,
        required: [true,'Informe um endereço para cadastro']
    },
    cep: {
        type: String,
        required: [true, 'O CEP é obrigatório no ato do cadastro']
    },
    pontoReferencia: {
        type: String
    },
    email: {
        type: String
    }

});

module.exports = mongoose.model('Cliente', schema);
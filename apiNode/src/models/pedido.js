'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    numero: {
        type : String,
        required: true,
    },
    dataPedido: {
        type : Date,
        required: true,
        default: Date.now
    },
    items: [{
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        }
    }]
});

module.exports = mongoose.model('Pedido', schema);
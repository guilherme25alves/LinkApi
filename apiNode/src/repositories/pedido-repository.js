'use strict'

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async(data) => {
    var res= await Pedido.find({})
    .populate('cliente')
    .populate('items.produto');
    return res;
}

exports.getByNumero = async(numero) => {
    const res = await Pedido
        .find({numero: numero})
        .populate('cliente')
        .populate('items.produto');
    return res; 
}

exports.create = async(data) => {
    var pedido = new Pedido(data);
    await pedido.save();
}

exports.delete = (numero) => {
    return Pedido.findOneAndRemove(numero);
}
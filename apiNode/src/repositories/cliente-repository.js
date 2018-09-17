'use strict'

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async() => {
    const res = await Cliente
    .find({},'nome telefone endereco cep pontoReferencia email');
    return res;
}

exports.getByTelefone = async(telefone) =>{
    const res = await Cliente
    .find({
        telefone: telefone},
        'nome telefone endereco cep pontoReferencia email');
    return res;    
}

exports.getById = async(id) => {
    const res = await Cliente
    .findById(id);
    return res;
}

exports.getByName = async(name) => {
    const res = await Cliente
    .find({
        nome: name}
        ,'nome telefone endereco cep pontoReferencia email');
    return res;
}

exports.create = (data) => {
    var cliente = new Cliente(data);
    return cliente.save();
    
}

exports.update = (id, data) => {
    return Cliente
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                telefone: data.telefone,
                endereco: data.endereco,
                cep: data.cep,
                pontoReferencia: data.pontoReferencia,
                email: data.email
            }
        })
}

exports.delete = (telefone) => {
    return Cliente.findOneAndRemove(telefone);
} 
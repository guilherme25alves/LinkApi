'use strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async() => {
    const res = await Produto
    .find({},'nome codigo ingredientes categoria valor');
    return res;
}

exports.getByCodigo = async(codigo) =>{
    const res = await Produto
    .find({
        codigo: codigo},
        'nome codigo ingredientes categoria valor');
    return res;    
}

exports.getById = async(id) => {
    const res = await Produto
    .findById(id);
    return res;
}

exports.getByName = async(name) => {
    const res = await Produto
    .find({
        nome: name}
        ,'nome codigo ingredientes categoria valor');
    return res;
}

exports.getByCategoria = async(categoria) => {
    const res = Produto
        .find({
            categoria: categoria,
            active: true
        }, 'nome codigo ingredientes categoria valor');
    return res;
}

exports.create = (data) => {
    var produto = new Produto(data);
    return produto.save();
    
}

exports.update = (id, data) => {
    return Produto
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                codigo: data.codigo,
                ingredientes: data.ingredientes,
                categoria: data.categoria,
                valor: data.valor
            }
        })
}

exports.delete = (codigo) => {
    return Produto.findOneAndRemove(codigo);
} 
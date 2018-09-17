'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/pedido-repository');
const guid = require('guid');

// Lista de todos os Pedidos
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

// Retorna pedido pelo seu número
exports.getByNumero = async (req, res, next) => {
    try {
        var data = await repository.getByNumero(req.params.numero);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
}

// Cadastro de Pedido
exports.post = async (req, res, next) => {
    try {
        await repository.create({
            cliente: req.body.cliente,
            numero: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Novo pedido efetuado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.numero)
        .then(x => {
            res.status(200).send({
                message: 'Dados do pedido removidos com sucesso!'
            });
        }).catch(e =>{
            res.status(400).send({
                message: 'Erro ao tentar remover os dados do pedido!',
                data: e
            });
        });
}
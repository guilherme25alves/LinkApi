'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/cliente-repository');

// Lista de todos os clientes
exports.get = async(req, res, next) => { 
    try {
       var data = await repository.get();
       res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

//Busca por Telefone
exports.getByTelefone = async(req, res, next) => {
    try {
        var data = await repository.getByTelefone(req.params.telefone);
        res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
    }
}

//Busca por ID 
exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

//Busca por Nome
exports.getByNome = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.nome);
        res.status(200).send(data);        
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    

    
}

// Cadastro de clientes
exports.post = (req, res, next) => {
    let contrato = new ValidationContract();
    contrato.hasMinLen(req.body.nome, 3, 'Nome deve conter no minímo 3 caracteres');
    contrato.hasMinLen(req.body.telefone, 9, 'Telefone deve conter no minímo 9 caracteres');
    contrato.hasMinLen(req.body.endereco, 10, 'Endereço deve conter no minímo 10 caracteres');
    contrato.hasMinLen(req.body.cep, 9, 'CEP deve conter 9 caracteres');
    contrato.hasMaxLen(req.body.cep, 9, 'CEP deve conter 9 caracteres');
    contrato.isEmail(req.body.email, 'Texto digitado não se refere a um email válido!');

    if (!contrato.isValid()){
        res.status(400).send(contrato.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ 
                message: 'Cliente cadastrado com sucesso!' 
            });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Erro ao cadastrar o cliente',
                 data: e 
            });
        });

};

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, req.body)
    .then(x => {
            res.status(200).send({
                message: 'Dados do cliente alterados com sucesso!'
            });
        }).catch(e =>{
            res.status(400).send({
                message: 'Erro ao tentar atualizar os dados do cliente!',
                data: e
            });
        });
};

// Deletando pelo telefone do Cliente
exports.delete = (req, res, next) => {
    repository
        .delete(req.body.telefone)
        .then(x => {
            res.status(200).send({
                message: 'Dados do cliente removidos com sucesso!'
            });
        }).catch(e =>{
            res.status(400).send({
                message: 'Erro ao tentar remover os dados do cliente!',
                data: e
            });
        });
}

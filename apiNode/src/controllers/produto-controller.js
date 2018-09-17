'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const ValidationContract = require('../validators/validator');
const repository = require('../repositories/produto-repository');


// Lista de todos os Produtos
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

//Busca por Código
exports.getByCodigo = async(req, res, next) => {
    try {
        var data = await repository.getByCodigo(req.params.codigo);
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

//Busca por Categoria 
exports.getByCategoria = async(req, res, next) => {
    try {
        var data = await repository.getByCategoria(req.params.categoria);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

// Cadastro de produtos
exports.post = (req, res, next) => {
    let contrato = new ValidationContract();
    contrato.hasMinLen(req.body.nome, 3, 'Nome deve conter no minímo 3 caracteres');
    contrato.hasMinLen(req.body.categoria, 4, 'Categoria deve conter no minímo 4 caracteres');

    if (!contrato.isValid()){
        res.status(400).send(contrato.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso no cardápio!' 
            });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Erro ao cadastrar o produto no cardápio',
                 data: e 
            });
        });

};

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, req.body)
    .then(x => {
            res.status(200).send({
                message: 'Dados do produto alterados com sucesso!'
            });
        }).catch(e =>{
            res.status(400).send({
                message: 'Erro ao tentar atualizar os dados do produto!',
                data: e
            });
        });
};

// Deletando pelo codigo do Produto
exports.delete = (req, res, next) => {
    repository
        .delete(req.body.codigo)
        .then(x => {
            res.status(200).send({
                message: 'Dados do produto removidos com sucesso!'
            });
        }).catch(e =>{
            res.status(400).send({
                message: 'Erro ao tentar remover os dados do produto!',
                data: e
            });
        });
}

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conectando ao Front 
app.use(express.static('./views'));

//Conectando ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });

//Carrega os models
const Cliente = require('./models/cliente');
const Produto = require('./models/produto');
const Pedido = require('./models/pedido');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const clienteRoute = require('./routes/cliente-route');
const produtoRoute = require('./routes/produto-route');
const pedidoRoute = require('./routes/pedido-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);
app.use('/clientes', clienteRoute);
app.use('/produtos', produtoRoute);
app.use('/pedidos', pedidoRoute);

module.exports = app;

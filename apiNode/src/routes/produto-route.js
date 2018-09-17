'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');

router.get('/', controller.get);
router.get('/:codigo', controller.getByCodigo);
router.get('/admin/:id', controller.getById);
router.get('/name/:nome', controller.getByNome);
router.get('/categoria/:categoria', controller.getByCategoria);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');

router.get('/', controller.get);
router.get('/:telefone', controller.getByTelefone);
router.get('/admin/:id', controller.getById);
router.get('/name/:nome', controller.getByNome);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
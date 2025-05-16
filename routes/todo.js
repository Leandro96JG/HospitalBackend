//raiz: /api/todo

const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getTodo, getDocColeccion } = require('../controllers/todo');

const router = Router();

router.get('/:busqueda',
    [
        validarJwt,
    ],getTodo)

router.get('/coleccion/:tabla/:busqueda',
    [
        validarJwt,
    ],getDocColeccion)


module.exports = router;
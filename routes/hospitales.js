
//Ruta raiz: /api/hospitales


const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital, buscarHospitalPorId } = require('../controllers/hospitales');

const router = Router();

router.get('/',[],getHospitales);
router.post('/',
    [
        validarJwt,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos,
    ],crearHospital);
router.put('/:id',[
    validarJwt,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
],actualizarHospital);
router.delete('/:id',[
    validarJwt,
],borrarHospital);
router.get('/:id',[
    validarJwt
],buscarHospitalPorId);

module.exports = router;
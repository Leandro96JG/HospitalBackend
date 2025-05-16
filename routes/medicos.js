
//Ruta raiz: /api/medicos


const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, buscarMedicoPorId } = require('../controllers/medicos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',[],getMedicos);
router.post('/',[
    validarJwt,
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('hospitalID','Hospital obligatorio').not().isEmpty(),
    check('hospitalID','Tiene que ser un ID valido').isMongoId(),
    validarCampos
],crearMedico);
router.put('/:id',[],actualizarMedico);
router.delete('/:id',[],borrarMedico);
router.get('/:id',[],buscarMedicoPorId);

module.exports = router;
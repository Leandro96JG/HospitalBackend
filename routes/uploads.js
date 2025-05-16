const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { uploadImg, getImg } = require('../controllers/uploads');
const fileUpload = require('express-fileupload');
const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id',[
    validarJwt,
],uploadImg);

router.get('/:tipo/:foto',[],getImg);


module.exports = router;
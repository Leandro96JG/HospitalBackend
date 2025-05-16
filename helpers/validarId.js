const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");
const { default: mongoose } = require('mongoose');

const validarId = async (res = response, tipo, id) => {
    
      if(!mongoose.isValidObjectId(id)){
                throw new Error('El id no es valido');
        }

    switch (tipo) {
      case "medicos":
        const medico = await Medico.findById(id);
        if(!medico){
          throw new Error('El medico no existe')
        }
        break;
      case "usuarios":
        const usuario = await Usuario.findById(id);
        if (!usuario) {
           throw new Error('El usuario no existe')
        }
        break;
      case "hospitales":
        const hospital = await Hospital.findById(id);
        if (!hospital) {
           throw new Error('El hospital no existe')
        }
        break;
      default:
         throw new Error('Tipo no valido')
        
    }

};

module.exports = {
  validarId,
};

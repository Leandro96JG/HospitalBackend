const { response } = require("express");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");
const Usuario = require("../models/usuario");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;

  const regEx = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regEx }),
    Medico.find({ nombre: regEx }),
    Hospital.find({ nombre: regEx }),
  ]);

  res.status(200).json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocColeccion = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const tabla = req.params.tabla;
  
  const regEx = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regEx }).populate(
        "usuario",
        "nombre img"
      )
      .populate(
        "hospital",
        "nombre img"
      )
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regEx }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regEx })
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Tipo de tabla no valida",
      });
  }

  res.status(200).json({
    ok: true,
    busqueda: data,
  });
};

module.exports = {
  getTodo,
  getDocColeccion,
};

const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImg } = require("../helpers/actualizar-img");
const { validarId } = require("../helpers/validarId");
const fs = require("fs");

const uploadImg = async (req, res = response) => {
  try {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ["hospitales", "medicos", "usuarios"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(404).json({
        ok: false,
        msg: "No es un tipo valido",
      });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No hay archivo",
      });
    }

    //Validar que exista el id
    await validarId(res, tipo, id);

    // Procesar img
    const file = req.files.imagen;
    const nombreCortado = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar ext

    const extValidas = ["png", "jpg", "jpeg", "gif", "webp"];
    if (!extValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        ok: false,
        msg: "Formato de archivo no valido",
      });
    }

    // Generar el nombre del archivo - uuid

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar img

    const path = `uploads/${tipo}/${nombreArchivo}`;

    //Mover la img
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: "Error al guardar archivo",
        });
      }

      //Actualiza base de datos
      actualizarImg(tipo, id, path, nombreArchivo);

      res.json({
        ok: true,
        msg: "Archivo subido con exito",
        nombreArchivo,
      });
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: err.message,
    });
  }
};

const getImg = async (req, res = response) => {
  try {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    
    // Si no existe la img en el directorio
    if (!fs.existsSync(pathImg)) {
        const pathNoImg = path.join(__dirname, `../uploads/not-img.png`); 
         res.sendFile(pathNoImg);
         return
    }

    res.sendFile(pathImg);

  } catch (err) {
    res.status(err.status).json({
      ok: false,
      msg: err.message,
    });
  }
};

module.exports = {
  uploadImg,
  getImg,
};

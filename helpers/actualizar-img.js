const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital')
const fs = require('fs')

let pathViejo='';

const borrarImg = (path) => {
    if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }
}

const actualizarImg = async (tipo,id,path,nombreArchivo)=>{

    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);

            pathViejo = `uploads/medicos/${medico.img}`;

            borrarImg(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
           
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            pathViejo = `uploads/usuarios/${usuario.img}`;

            borrarImg(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
             pathViejo = `uploads/hospitales/${hospital.img}`;
            
             borrarImg(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
    }


}

module.exports = {
    actualizarImg
}
const {response} = require('express');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const { default: mongoose } = require('mongoose');

const getMedicos = async (req, res = response)=>{


    const medicos = await Medico.find()
                                .populate('hospital','nombre')
                                .populate('usuario','nombre')

    res.json({
        ok:true,
        msg:'Todos los Medicos',
        medicos
    })

}

const crearMedico = async (req, res = response)=>{

    const uid = req.uid;
    const hospitalID = req.body.hospitalID;
    try{
        //Se puede usar un metodo en el check pero lo dejo como referencia de que es necesario
        if(!mongoose.isValidObjectId(hospitalID)){
            return res.status(400).json({
                ok:false,
                msg:'El id del hospital no es valido',
            })
        }
        
        const existeHospital = await Hospital.findById(hospitalID);
        
        if(!existeHospital){
            return res.status(400).json({
                ok:false,
                msg:'No existe hospital con el ID especificado',
            })
        }
        
        const nuevoMedico = new Medico({
            usuario:uid,
            hospital:hospitalID,
            ...req.body
        });

        const medicoDB = await nuevoMedico.save();

        res.status(200).json({
            ok:true,
            msg:'Nuevo medico creado',
            medico: medicoDB
        })

    }catch(err){
        console.log(err);
        
            res.status(400).json({
                ok:false,
                msg:'Error al crear medico'
            })
            
        }
        
}

const actualizarMedico = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Actualizar Medico'
    })

}

const borrarMedico = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Borrar Medico'
    })

}
const buscarMedicoPorId = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Buscar Medico por Id'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    buscarMedicoPorId
}
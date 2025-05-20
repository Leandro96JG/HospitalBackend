const {response} = require('express');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const { default: mongoose } = require('mongoose');
const { validatorResponse } = require('../helpers/error-response');

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

const actualizarMedico = async (req, res = response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try{
        const medico = await Medico.findById(id);
        if(!medico){
            validatorResponse(400,'Medico no encontrado o no existente');
        }
        const usuario = await Usuario.findById(uid);

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});

        res.status(200).json({
            ok:true,
            msg:'Medico Actualizado',
            medico: medicoActualizado,
        })
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            ok:false,
            msg:'Error al actualizar medico'
        })
    }


}

const borrarMedico = async (req, res = response)=>{

    const id = req.params.id;

    try{
        const medico = await Medico.findById(id);
        if(!medico){
            validatorResponse(400,'Medico no encontrado o no existente');
        }
        await Medico.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg:'Medico eliminado con exito'
        })
        
    }catch(err){
      console.log(err)  
        res.status(400).json({
            ok:true,
            msg:'Error al eliminar medico'
        })
    }
    
}
const buscarMedicoPorId = async (req, res = response)=>{
    const id = req.params.id;
    try{
        const medico = await Medico.findById(id);
        if(!medico){
            validatorResponse(400,'Medico no encontrado o no existente');
        }

         res.status(200).json({
            ok:true,
            medico
        })
    
    }catch(err){
     console.log(err)  
        res.status(400).json({
            ok:true,
            msg:'Error al eliminar medico'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    buscarMedicoPorId
}
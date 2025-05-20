
const {response} = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const { validatorResponse } = require('../helpers/error-response');

const getHospitales = async (req, res = response)=>{

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre')
                                     


    res.json({
        ok:true,
        msg:'Todos los hospitales',
        hospitales
    })

}

const crearHospital = async (req, res = response)=>{

    try{

        const nuevoHospital = new Hospital({
            usuario:req.uid,
            ...req.body
        })

        const hospitalSave = await nuevoHospital.save()

        res.status(400).json({
            ok:false,
            msg:'Nuevo Hospital creado',
            hospital:hospitalSave
        })

    }catch(err){
        console.log(err)
        res.status(400).json({
            ok:false,
            msg:'Error al crear hospital'
        })
    }

}

const actualizarHospital = async (req, res = response)=>{
    const id = req.params.id;
    const uid = req.uid;
   
    try{
        const updateHospital = await Hospital.findById(id);
        
        if(!updateHospital){
            validatorResponse('Hospital no existe',404);
        }
    
        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

        //new retorna el dato actualizado
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital,{new:true});
        res.status(200).json({
            ok:true,
            msg:'Hospital Actualizado',
            hospital:hospitalActualizado
        })
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            ok:false,
            msg:err.message
        })
    }

}

const borrarHospital = async (req, res = response)=>{

const id = req.params.id;
const uid = req.uid;

    try{
        const hospital = await Hospital.findById(id);
        if(!hospital){
            validatorResponse(402,'No existe hospital')
           
        }

    //TODO: Se podria agregar una funcion de auditoria

       await Hospital.findByIdAndDelete(id);

       const eliminadoPor = await Usuario.findById(uid);

        res.json({
            ok:true,
            msg:'Hospital borrado',
            usuario : eliminadoPor.nombre
        })

    }catch(err){
        console.log(err)
        res.json({
            ok:false,
            msg:'Error al eliminar hospital'
        })

    }


}
const buscarHospitalPorId = async (req, res = response)=>{


    try{
        const id = req.params.id;
        const hospital = await Hospital.findById(id);
        if(!hospital){
            validatorResponse(400,'No existe hospital con el id ingresado')
        }

        res.json({
            ok:true,
            hospital
        })



    }catch(err){
        res.status(400).json({
            ok:false,
            msg:'Error al buscar hospital'
        })
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
    buscarHospitalPorId
}
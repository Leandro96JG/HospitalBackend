
const {response} = require('express');
const Hospital = require('../models/hospital');

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

const actualizarHospital = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Actualizar hospital'
    })

}

const borrarHospital = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Borrar hospital'
    })

}
const buscarHospitalPorId = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Buscar hospital por Id'
    })

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
    buscarHospitalPorId
}
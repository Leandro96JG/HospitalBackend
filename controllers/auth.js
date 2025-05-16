const { response } = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response)=>{

    const { email, password } = req.body;

    try{

        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'Email no valido',
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDb.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Contraseña no valida'
            });
        }

        //Generar un token

        const token = await generarJWT(usuarioDb.id);

        res.status(200).json({
            ok:true,
            msg:'Todo Ok',
            token
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            ok:false,
            msg:'Ups! Algo salio mal'
        })
    }
}

const googleSingIn = async (req, res= response) => {

    try{
        const {name,email,picture} = await googleVerify(req.body.token);

        const userDB = await Usuario.findOne({email});
        let usuario;
        if(!userDB){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario = userDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok:true,
            email,
            name,
            picture,
            token
        })

    }catch(err){
        console.log(err)
        res.status(400).json({
           ok:false,
           msg:'Error al validar token'
        })

    }

}

module.exports = {
    login,
    googleSingIn
}
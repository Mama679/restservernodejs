const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/generarjwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res=response) =>{
    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});
        if(!usuario)
        {
            return res.status(400).json({
                msg:"Usuario/Password Incorrecto - Correo"
            });
        } 
        if(!usuario.estado)
        {
            console.log(usuario.estado);
            return res.status(400).json({
                msg:"Usuario/Password Incorrecto - Estado = False"
            });
        }

        const validarClave = bcryptjs.compareSync(password,usuario.password);
        if(!validarClave)
        {
            return res.status(400).json({
                msg:"Usuario/Password Incorrecto - Password"
            });
        }
        const token = await generarJwt(usuario.id);
        res.json({
            msg:"Login de usuario OK",
            usuario,
            token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Comuniquese con el Administrador'
        });
    }
    
}

const googleSigin = async(req, res = response)=>{
    const {id_token} = req.body;
    try{
       const {nombre,img,correo} = await googleVerify(id_token);
       // const googleUser = await googleVerify(id_token);
        //console.log(googleUser)

        let usuario = await Usuario.findOne({correo});
        if(!usuario)
        {
            const data = {
                nombre,
                correo,
                password:':P',
                rol:'ADMIN_ROLE',
                img,
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:"Usuario no existe, comuniquese con el administrador"
            });
        }

        const token = await generarJwt(usuario.id);

        res.json({
            msg:'Todo Ok',
            usuario,
            token
        });
    }
    catch(error)
    {
        res.json.status(400).json({
            ok:false,
            msg:"Error Token necesario"
        });
    }
    
}

module.exports = {
    login,
    googleSigin
}
const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/generarjwt');

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

module.exports = {
    login
}
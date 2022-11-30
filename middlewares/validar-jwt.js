const {request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJwt = async(req = request, res = response, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"No hay Token en la Petición"
        });
    }
    try{
        //const payload = jwt.verify(token,process.env.SECRET_KEY);
        //console.log(payload);
        const {uid} = jwt.verify(token,process.env.SECRET_KEY);
        //req.uid = uid;
        const usuario = await Usuario.findById(uid);
        //Validar que el usuario exista en la BD
        if(!usuario)
        {
            return res.status(401).json({
                msg:"Usuario No existe en la Base de Datos"
            });
        }

        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:"Usuario Esta Inactivo en la Base de Datos"
            });
        }
        req.usuario = usuario;
       next();
    }catch(error)
    {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        });
    }
}

module.exports = {
    validarJwt
}
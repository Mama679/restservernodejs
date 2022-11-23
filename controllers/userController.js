const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const userGet = async(req=request, res = response) =>{
    const {limite = 5, desde=0} = req.query;
    const consulta = {estado: true};
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(consulta),
        Usuario.find(consulta)
          .limit(Number(limite))
          .skip(Number(desde))
    ]);

    res.json({
        total,
        usuarios
    }); 
}

const userPost = async(req, res = response) =>{
    //const body = req.body;
    //Deserailizamos el body
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
    //Encriptar Contraseña,   
    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar en Base de Datos usuario   
    await usuario.save();
    res.status(201).json({
        msg:'Usuario Agregado',
        usuario
    }); 
}

const userPut = async (req, res = response) =>{
    const {id} = req.params;
    const {password,google,...resto} = req.body;
    //Validar contraseña del BD
    if(password){
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const user = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg:'Usuario Actualizado',
        user
    });
}

const userDelete = (req, res = response) =>{
    const {id} = req.params;
    res.json({
        msg:'Petición Delete - Controlador',
        id
    });
}

const userPatch = (req, res = response) =>{
    res.json({
        msg:'Petición PATCH - Controlador'
    });  
}

module.exports ={
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}
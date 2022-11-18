const {request,response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const userGet = (req=request, res = response) =>{
    const {q,nombre="Sin nombre",pag=1,limit} = req.query;
    
    res.json({
        msg:'Petición GET - Controlador',
        q,
        nombre,
        pag,
        limit
    }); 
}

const userPost = async(req, res = response) =>{

    //const body = req.body;
    //Deserailizamos el body
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //Validamos correo
    //Encriptar Contraseña,   
    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar en Base de Datos usuario   
    await usuario.save();
    res.status(201).json({
        msg:'Petición POST - Usuario Agregado',
        usuario
    }); 
}

const userPut = (req, res = response) =>{
    const {id} = req.params;
    res.json({
        msg:'Petición PUT - Controlador',
        id
    });
}

const userDelete = (req, res = response) =>{
    res.json({
        msg:'Petición Delete - Controlador'
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
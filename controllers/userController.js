const {response} = require('express');

const userGet = (req, res = response) =>{
    res.json({
        msg:'Petición GET - Controlador'
    }); 
}

const userPost = (req, res = response) =>{
    res.status(201).json({
        msg:'Petición POST - Controlador'
    }); 
}

const userPut = (req, res = response) =>{
    res.json({
        msg:'Petición PUT - Controlador'
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
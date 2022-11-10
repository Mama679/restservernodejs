const {request,response} = require('express');

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

const userPost = (req, res = response) =>{

    //const body = req.body;
    const {nombre,edad} = req.body;
    res.status(201).json({
        msg:'Petición POST - Controlador',
        nombre,
        edad
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
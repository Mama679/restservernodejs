const {response} = require('express');

const buscar = (req, res=response) =>{
    const {coleccion,termino} = req.params;
    res.json({
        coleccion,
        termino,
        msg:"Buscar por..."
    })
}

module.exports ={
    buscar
}
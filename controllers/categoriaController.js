const { request, response } = require('express');
const { validationResult } = require('express-validator');
const Categoria = require('../models/categoria');

//Obtener listdo de Categorias
const categoriaListado = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
            .populate('usuario','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        categorias
    });
}

//Obtener Categoria por ID
const obtenerCategoria = async (req = resquet, res = response) => {
    const { id } = req.params;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
    const categoria = await Categoria.findById(id)
                                     .populate('usuario','nombre');
    if (!categoria) {
        return res.status(400).json({
            msg: `Categoria con codigo ${id}, no existe`
        });
    }

    res.json({
        categoria,
        msg:'OK'
    });
}

//Creacion de Categoria
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDb = await Categoria.findOne({ nombre });

    if (categoriaDb) {
        return res.status(400).json({
            msg: `La Categoria ${categoriaDb.nombre}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);
    //Guardar en la Base de Datos
    await categoria.save();
    res.status(201).json({
        categoria,
        msg: 'Categoria Agregada.',
    });

}

//Actualizar Categoria Listado
const actualizarCategoria = async(req = request, res = response) =>{
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const estado = req.body.estado;
    const usuario = req.usuario._id;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

     //Generar data a guardar
    const categoria = await Categoria.findByIdAndUpdate(id,{nombre:nombre,estado:estado,usuario:usuario},{new:true});
    await categoria.save();
    res.json({
        msg:'Categoria Actualizada',
        categoria
    });
 }
 //Desactivar Categoria
 const eliminarCategoria = async(req = request, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado: false},{new:true});
    res.json({
        msg:'Categoria Desactivada',
        categoria
    });
 }

module.exports = {
    crearCategoria,
    categoriaListado,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}

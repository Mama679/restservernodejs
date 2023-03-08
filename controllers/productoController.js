const { request, response } = require('express');
const { validationResult } = require('express-validator');
const Producto = require('../models/producto');

//Obtener listado de Productos
const productoListado = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, producto] = await Promise.all([
        Producto.countDocuments(),
            Producto.find()
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        producto
    });
}

//Obtener Producto por ID
const obtenerProdcto = async(req = request, res=response) =>{
    const {id} = req.params;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    const producto = await Producto.findById(id)
                                     .populate('categoria','nombre')
                                     .populate('usuario','nombre');
    if (!producto) {
        return res.status(400).json({
            msg: `Producto con codigo ${id}, no existe`
        });
    }

    res.json({
        producto,
        msg:'OK'
    });
}

//Crear Producto
const crearProducto = async(req=request, res=response) =>{
    const {nombre,descripcion,precio,categoria,disponible} = req.body;
    //const {estado,usuario, ...body} = req.body;
    const productoDb = await Producto.findOne({ nombre });
    //const productoDb = await Producto.findOne({ nombre: body.nombre });
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    if (productoDb) {
        return res.status(400).json({
            msg: `El Producto ${productoDb.nombre}, ya existe`
        });
    }
    //Generar data a guardar
    /*
    const dada ={
        ...body,
        nombre = body.nombre.toUpperCase(),
        usuario:req.usuario._id
    };
    */ 
    const data = {
        nombre: nombre.toUpperCase(),
        descripcion,
        precio,
        categoria,
        disponible,
        usuario:req.usuario._id
    };

    const producto = new Producto(data);
    //Guardar en la Base de Datos
    await producto.save();
    res.status(201).json({
        producto,
        msg: 'Producto Agregado.',
    });
}

//Actualizar producto
const actualizarProducto = async(req=request, res=response) =>{
    const {id} = req.params;
    const usuario = req.usuario._id;
    const {nombre,descripcion,precio,categoria,estado,disponible} = req.body;

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    const producto = await Producto.findByIdAndUpdate(id,{nombre,descripcion,precio,categoria,estado,disponible,usuario},{new:true});
    await producto.save();

    res.json({
        msg:'Producto ha sido actualizado.',
        producto
    });
}

//Desactivar producto
const borrarProducto = async(req=request,res=response) =>{
    const {id} = req.params;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }
    const producto = await Producto.findByIdAndUpdate(id,{estado: false},{new:true});
    res.json({
        msg:'Producto Desactivado',
        producto
    });
}

module.exports = {
    crearProducto,
    productoListado,
    obtenerProdcto,
    actualizarProducto,
    borrarProducto
}
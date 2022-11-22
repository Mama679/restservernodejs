const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const rolValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El Rol ${rol} no esta Registrado en la BD`);
    }
}

const emailExiste = async(correo = '') =>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El correo ${correo} Ya esta registrado en la BD`);
    }
}

module.exports ={
    rolValido,
    emailExiste
}
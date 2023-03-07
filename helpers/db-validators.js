const Role = require('../models/rol');
const {Usuario, Categoria} = require('../models/');


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

const usuarioExiste = async(id) =>{
    const existeUser = await Usuario.findById(id);
    if(!existeUser){
        throw new Error(`El ID ${id} No Existe en la BD`);
    }
}

const categoriaExiste = async(id) => {
    const existeCat = await Categoria.findById(id);
    if(!existeCat){
        throw new Error(`El ID ${id} No Existe en la BD`);
    }
}

module.exports ={
    rolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste
}
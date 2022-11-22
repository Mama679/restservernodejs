const {Router} = require('express');
const {chech, check} = require('express-validator');
const {userGet,userPost,userPut,userDelete,userPatch} = require('../controllers/userController');
const Role = require('../models/rol');

const route = Router();

route.get("/", userGet);
route.post("/",[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio maximo 6 caracteres').isLength({min: 6}),
    //check('rol','No es un Rol Permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async (rol = '') =>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El Rol ${rol} no esta Registrado en la BD`);
        } 
    }),
    check('correo','El correo no es valido').isEmail()
],userPost);
route.put("/:id",userPut);
route.delete("/",userDelete);
route.patch("/",userPatch);           

module.exports=route;
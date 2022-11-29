const {Router} = require('express');
const {check} = require('express-validator');
const {userGet,userPost,userPut,userDelete,userPatch} = require('../controllers/userController');
const { rolValido,emailExiste,usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const route = Router();

route.get("/", userGet);

route.post("/",[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio maximo 6 caracteres').isLength({min: 6}),
    //check('rol','No es un Rol Permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolValido),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
],userPost);

route.put("/:id",[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(usuarioExiste),
    check('rol').custom(rolValido),
    validarCampos
],userPut);

route.delete("/:id",[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos 
],userDelete);
route.patch("/",userPatch);           

module.exports=route;
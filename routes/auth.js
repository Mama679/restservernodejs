const {Router} = require('express');
const {check} = require('express-validator');
const {login,googleSigin} = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.post('/',[
    check('correo','Ingresar correo valido').isEmail(),
    check('password','Ingresar Password').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','Token Id es Necesario').not().isEmpty(),
    validarCampos
],googleSigin);

module.exports = router;
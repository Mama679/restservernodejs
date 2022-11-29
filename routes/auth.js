const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.post('/',[
    check('correo','Ingresar correo valido').isEmail(),
    check('password','Ingresar Password').not().isEmpty(),
    validarCampos
],login);

module.exports = router;
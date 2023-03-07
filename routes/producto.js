const {Router} = require('express');
const {check} = require('express-validator');
const {categoriaExiste,productoExiste} =  require('../helpers/db-validators');
const { validarCampos,validarJwt,esAdminRol } = require('../middlewares/');
const {crearProducto,productoListado,obtenerProdcto,actualizarProducto,borrarProducto} = require('../controllers/productoController');

const router = Router();
//Obtener listado de productos
router.get('/', productoListado);

//Obtener producto por Id
router.get('/:id',[ 
    check('id','No es un ID Valido').isMongoId()
],
obtenerProdcto);

//Crear Producto
router.post('/',
[
    validarJwt,
    check('nombre','Nombre Producto es obligatorio').not().isEmpty(),
    check('categoria','Seleccionar una categoria').not().isEmpty(),
    check('categoria').custom(categoriaExiste),
    validarCampos
],
crearProducto);

//Actualizar Producto
router.put('/:id',
    [
        validarJwt,
        esAdminRol,
        check('id','No es un ID Valido').isMongoId(),
        check('id').custom(productoExiste),
        check('categoria').custom(categoriaExiste),
        validarCampos
    ],
    actualizarProducto);

//Eleminar o desactivar producto
router.delete('/:id',
[
    validarJwt,
    esAdminRol,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(productoExiste),
],
borrarProducto);

module.exports = router;
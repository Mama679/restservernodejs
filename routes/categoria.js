const {Router} = require('express');
const {check} = require('express-validator');
const {categoriaExiste} =  require('../helpers/db-validators');
const { validarCampos,validarJwt,esAdminRol } = require('../middlewares/');
const { crearCategoria,categoriaListado,obtenerCategoria,actualizarCategoria,eliminarCategoria } = require('../controllers/categoriaController');


const router = Router();
//Obtener Listado de Categoria
router.get('/',categoriaListado);
//Obtener Categoria por ID
router.get('/:id',
[ 
    check('id','No es un ID Valido').isMongoId()
], 
obtenerCategoria);
//Crear Categoria Token Valido - USER_Admin
router.post('/',
[
   validarJwt,
   check('nombre','Nombre Categoria es obligatorio').not().isEmpty(),
   validarCampos
],
   crearCategoria
);

//Actualizar Categoria usuario con permiso
router.put('/:id',
[
    validarJwt,
    esAdminRol,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(categoriaExiste),
    check('nombre','Nombre Categoria es obligatorio').not().isEmpty(),  
    validarCampos
],
actualizarCategoria
);

//Deasctivar Categoria
router.delete('/:id', 
[
    validarJwt,
    esAdminRol,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(categoriaExiste),  
    validarCampos
],
eliminarCategoria
);

module.exports = router;
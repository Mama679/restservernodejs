const {response,request} = require('express');

const esAdminRol = (req=request, res = response, next) =>{
    if(!req.usuario)
    {
        return res.status(500).json({
            msg:"Validar Rol Administrador"
        });
    }

    const {rol,nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE')
    {
        return res.status(400).json({
            msg:`${nombre} no tiene permiso de Admnistrador`
        })
    }


    next();
}

module.exports = {
    esAdminRol
}
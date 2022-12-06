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
        return res.status(401).json({
            msg:`${nombre} no tiene permiso de Admnistrador`
        });
    }

    next();
}

const tieneRol = (...roles) =>{
    return(req,res=response,next) =>{
        if(!req.usuario){
            return res.status(500).json({
                msg:"Se requiere autenticar usuario"
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos Roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}
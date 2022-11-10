const cors = require('cors');
const express = require("express");

class Server{

    constructor(){
        this.app = express();
        //Middlewares
        this.middlewares();
        //Rutas de la app
        this.usuariosPath ='/api/usuarios';
        this.routes();
        this.port = process.env.PORT;
        
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
        //Proceso de lectura  del Body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Aplicacion Corriendo en: " + process.env.PORT);
        });
    }
}

module.exports=Server;
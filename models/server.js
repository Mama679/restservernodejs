const cors = require('cors');
const express = require("express");
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app = express();

        //Conectar a la Base de Datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de la app
       // this.usuariosPath ='/api/usuarios';
        //this.authPath = '/api/auth';
        this.rutas = {
            auth:'/api/auth',
            categoria:'/api/categoria',
            user:'/api/usuarios'
        };
        this.routes();
        this.port = process.env.PORT;
        
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
        //Proceso de lectura  del Body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.rutas.auth,require('../routes/auth'));
        this.app.use(this.rutas.categoria,require('../routes/categoria'));
        this.app.use(this.rutas.user, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Aplicacion Corriendo en: " + process.env.PORT);
        });
    }
}

module.exports=Server;
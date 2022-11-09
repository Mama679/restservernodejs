const express = require("express");

class Server{

    constructor(){
        this.app = express();
        //Middlewares
        this.middlewares();
        //Rutas de la app
        this.routes();
        this.port = process.env.PORT;
    }

    middlewares(){
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get("/api",(req,res)=>{
            res.json({
                msg:'Petición GET'
            });           
        });

        this.app.post("/api",(req,res)=>{
            res.status(201).json({
                msg:'Petición POST'
            });           
        });

        this.app.put("/api",(req,res)=>{
            res.json({
                msg:'Petición PUT'
            });           
        });

        this.app.delete("/api",(req,res)=>{
            res.json({
                msg:'Petición DELETE'
            });           
        });

        this.app.patch("/api",(req,res)=>{
            res.json({
                msg:'Petición PATCH'
            });           
        });
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Aplicacion Corriendo en: " + process.env.PORT);
        });
    }
}

module.exports=Server;
require('dotenv').config();
const express = require("express");
const app = new express();

app.get("/",(req,res)=>{
    res.send("<h1>Hola Mundo</h1>");
    res.end();
});

app.listen(process.env.PORT,()=>{
    console.log("Aplicacion Corriendo en: " + process.env.PORT);
});
const {Router} = require('express');

const route = Router();

route.get("/",(req,res)=>{
    res.json({
        msg:'Petición GET'
    });           
});

route.post("/",(req,res)=>{
    res.status(201).json({
        msg:'Petición POST'
    });           
});

route.put("/",(req,res)=>{
    res.json({
        msg:'Petición PUT'
    });           
});

route.delete("/",(req,res)=>{
    res.json({
        msg:'Petición DELETE'
    });           
});

route.patch("/",(req,res)=>{
    res.json({
        msg:'Petición PATCH'
    });           
});

module.exports=route;
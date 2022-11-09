const {Router} = require('express');
const {userGet,userPost,userPut,userDelete,userPatch} = require('../controllers/userController');

const route = Router();

route.get("/", userGet);
route.post("/",userPost);
route.put("/",userPut);
route.delete("/",userDelete);
route.patch("/",userPatch);           

module.exports=route;
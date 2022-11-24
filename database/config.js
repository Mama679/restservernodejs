const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
            await mongoose.connect(process.env.MONGO_CNN);
            console.log('Base de Datos Online');
    }catch(error){
        console.log(error);
        throw new Error("Error a Conectar en Base de Datos");
    }
}

module.exports={
    dbConnection
}
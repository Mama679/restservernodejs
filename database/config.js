const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
            await mongoose.connect(process.env.MONGO_CNN2);
            console.log('Base de Datos Online');
    }catch(error){
        console.log(error);
        throw new Error("Error a Conectar en Base de Datos");
    }
}

module.exports={
    dbConnection
}
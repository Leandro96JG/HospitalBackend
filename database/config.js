
const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async ()=>{
  
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    }catch(err){
        console.log(err);
        throw new Error('Error a la hora de iniciar la BD, ver logs');
        
    }

}

module.exports = {
    dbConnection
}
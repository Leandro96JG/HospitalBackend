const {Schema , model, default: mongoose} = require('mongoose');
//Creamos nuestro esquema de datos que va a tener nuestro hospital
const MedicoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    //Para relaciones
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }
},);

MedicoSchema.method('toJSON',function(){

    const { __v, ...object } = this.toObject();
    return object;

})

module.exports = model('Medico',MedicoSchema);
const {Schema , model, default: mongoose} = require('mongoose');
//Creamos nuestro esquema de datos que va a tener nuestro hospital
const HospitalSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    //Para relaciones
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
    }
},{collection:'hospitales'});

HospitalSchema.method('toJSON',function(){

    const { __v, ...object } = this.toObject();
    return object;

})

module.exports = model('Hospital',HospitalSchema);
//usar env
require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');


// Crear el servidor
const app = express();


//Carpeta public
app.use(express.static('public'))

app.use((req, res=express.response, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy');
  next();
});


// Configurar CORS - .use es como un control o filtro que se ejecuta antes de cualquier peticion
app.use( cors() );



//Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

app.listen(process.env.PORT,()=>{
    console.log('Servidor iniciado en el puerto: ',process.env.PORT)
})

// Rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/todo'));
app.use('/api/upload',require('./routes/uploads'));


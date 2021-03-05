// Importación de módulos de versiones anteriores
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routeUsuarios = require('./routes/usuarios');
const routeAuth = require('./routes/auth');
const routeMemes = require('./routes/memes');
const cors = require('cors');

// crear el servidor
const app = express();
app.use(cors());

// Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rnfxk.mongodb.net/practicabackend?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);

// Habilitar express.json (tambien se puede usar body parser)
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

//importar rutas
app.use('/api/usuarios', routeUsuarios);
app.use('/api/auth', routeAuth);
app.use('/api/memes', routeMemes);

// puerto y arranque del servidor
app.listen(4000, () => {
    console.log('Servidor Funcionando');
});

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Servir imágenes desde /uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

const routes = require('./routes/index.routes');
app.use('/api', routes);

const dbcvecinal = require('./models/index.models');

dbcvecinal.sequelize
    //.sync({ alter: true })
    .sync()
    .then(() => {
        console.log('BASE DE DATOS SINCRONIZADA');
    })
    .catch((err) => {
        console.error('ERROR EN SINCRONIZACIÓN DE BASE DE DATOS:', err);
    });

const PUERTO = 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

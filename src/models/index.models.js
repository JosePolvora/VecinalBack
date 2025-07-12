const { Sequelize } = require('sequelize');
const sequelize = require('../configs/app.configs');

const dbcvecinal = {};

dbcvecinal.Sequelize = Sequelize;
dbcvecinal.sequelize = sequelize;


dbcvecinal.Novedad = require('./novedad.model')(sequelize, Sequelize);
dbcvecinal.Imagen = require('./imagen.model')(sequelize, Sequelize);





// No definimos relaciones por ahora

module.exports = dbcvecinal;

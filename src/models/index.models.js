const { Sequelize } = require('sequelize');
const sequelize = require('../configs/app.configs');

const dbcvecinal = {};

dbcvecinal.Sequelize = Sequelize;
dbcvecinal.sequelize = sequelize;


dbcvecinal.Novedad = require('./novedad.model')(sequelize, Sequelize);
dbcvecinal.Imagen = require('./imagen.model')(sequelize, Sequelize);
dbcvecinal.Reclamo = require('./reclamo.model')(sequelize, Sequelize);
dbcvecinal.Revista = require('./revista.model')(sequelize, Sequelize);
dbcvecinal.Usuario = require('./usuario.model')(sequelize, Sequelize);
dbcvecinal.Mensaje = require('./mensaje.model')(sequelize, Sequelize);


// No definimos relaciones por ahora

module.exports = dbcvecinal;

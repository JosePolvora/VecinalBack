const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("dbcvecinal", "root", '', {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
}
);

module.exports = sequelize;
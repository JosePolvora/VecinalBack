const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Imagen = sequelize.define('Imagen', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagen_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'imagenes',
        timestamps: false

    });

    return Imagen;
};


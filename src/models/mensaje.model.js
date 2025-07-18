const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Mensaje = sequelize.define("mensaje",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },

            apellido: {
                type: DataTypes.STRING,
                allowNull: false
            },

            correo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            mensaje: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
        tableName: 'mensajes',
        timestamps: false

    });

    return Mensaje

}
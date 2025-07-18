const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            nombre: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            apellido: {
                type: DataTypes.STRING,
                allowNull: true
            },

            correo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            clave: {
                type: DataTypes.STRING,
                allowNull: false
            },

            rol: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'admin'
            },

            activo: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        });

    return Usuario

}
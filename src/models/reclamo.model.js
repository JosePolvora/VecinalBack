const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Reclamo = sequelize.define('Reclamo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },

        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },

        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },

        asunto: {
            type: DataTypes.STRING,
            allowNull: false
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        numeroReclamo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pendiente',
        },

    }, {
        tableName: 'reclamos',
        timestamps: false

    });

    return Reclamo;
};

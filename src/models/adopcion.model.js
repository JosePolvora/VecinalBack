const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Adopcion = sequelize.define(
    "adopcion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "adopciones",
      timestamps: false,
    }
  );

  return Adopcion;
};

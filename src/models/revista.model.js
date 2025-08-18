const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Revista = sequelize.define(
    "Revista",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mes: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      paginas_carpeta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "revistas",
      timestamps: false,
    }
  );

  return Revista;
};

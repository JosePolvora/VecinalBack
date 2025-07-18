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
        type: DataTypes.STRING, // Ejemplo: "2025-07"
        allowNull: false,
        unique: true,
      },
      pdf_url: {
        type: DataTypes.STRING,
        allowNull: false,
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

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Mascota = sequelize.define('Mascota', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true  // si no siempre hay imagen
    }
  }, {
    tableName: 'mascotas',
    timestamps: false
  });

  return Mascota;
};

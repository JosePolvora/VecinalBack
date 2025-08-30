const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Mascota = sequelize.define(
    "Mascota",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true, // a veces no se sabe el nombre
      },
      tipo: {
        type: DataTypes.STRING, // perro, gato, ave, otro
        allowNull: false,
      },
      raza: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edad: {
        type: DataTypes.STRING, // ej: "2 años" o "cachorro"
        allowNull: true,
      },
      sexo: {
        type: DataTypes.STRING, // macho / hembra
        allowNull: true,
      },
      tamano: {
        type: DataTypes.STRING, // chico / mediano / grande
        allowNull: true,
      },

      condicion: {
        type: DataTypes.STRING, // perdido, encontrado, en adopción
        allowNull: false,
      },
      lugar: {
        type: DataTypes.STRING, // dónde se perdió/encontró
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contacto_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contacto_telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "mascotas",
      timestamps: false,
    }
  );

  return Mascota;
};

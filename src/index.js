require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Configuración de CORS para permitir solo el dominio del frontend
app.use(cors({
  origin: "https://www.santaisabel2.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Si tu frontend envía cookies o auth headers
}));

app.use(express.json());

// ✅ Servir imágenes desde /uploads
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// ✅ Rutas principales
const routes = require("./routes/index.routes");
app.use("/api", routes);

// ✅ Conexión a base de datos
const dbcvecinal = require("./models/index.models");

dbcvecinal.sequelize
  //.sync({ alter: true }) // Solo usar en desarrollo
  .sync()
  .then(() => {
    console.log("BASE DE DATOS SINCRONIZADA");
  })
  .catch((err) => {
    console.error("ERROR EN SINCRONIZACIÓN DE BASE DE DATOS:", err);
  });

// ✅ Iniciar servidor
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: dbcvecinal
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen_url` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (2,'/uploads/banners/1754524367375.png','banneralgarrobo','2025-08-06 23:52:47','2025-08-06 23:52:47','',NULL),(8,'/uploads/banners/1754588491732.png','almacor','2025-08-07 17:41:31','2025-08-07 17:41:31','auspiciantes','https://www.almacor.com.ar/'),(9,'/uploads/banners/1754588622991.png','sanchezmartinez','2025-08-07 17:43:42','2025-08-07 17:43:42','auspiciantes','https://www.facebook.com/sanchezmartinezehijossa?locale=es_LA'),(10,'/uploads/banners/1754588659534.png','caniceria','2025-08-07 17:44:19','2025-08-07 17:44:19','auspiciantes','https://www.facebook.com/profile.php?id=61553444245191&sk=about');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen_url` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (10,'/uploads/galeria/1752875061665.jpeg','Kermes Grupal'),(11,'/uploads/galeria/1754149462155.jpeg','feria001'),(12,'/uploads/galeria/1754150497515.jpeg','img01'),(13,'/uploads/galeria/1754150509946.jpeg','img02'),(14,'/uploads/galeria/1754150519366.jpeg','img03'),(15,'/uploads/galeria/1754150531439.jpeg','img04'),(16,'/uploads/galeria/1754150541507.jpeg','img05');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `novedades`
--

DROP TABLE IF EXISTS `novedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` datetime NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `novedades`
--

LOCK TABLES `novedades` WRITE;
/*!40000 ALTER TABLE `novedades` DISABLE KEYS */;
INSERT INTO `novedades` VALUES (3,'Nuestro Barrio Brilló en la Primera Feria Kermés','Este fin de semana, el corazón del barrio latió más fuerte que nunca. Vecinos, vecinas, familias enteras y niños con sonrisas enormes se dieron cita en la esperada primera Feria Kermés organizada por la Lista 21 \"Nuestro Barrio\".\r\nLa plaza se llenó de colores, aromas y música. Cada puesto contó una historia: desde artesanías hechas con amor hasta platos típicos que evocaban recuerdos compartidos. Hubo juegos, sorteos, presentaciones artísticas y sobre todo, abrazos entre quienes hace tiempo no se veían.\r\nMás que una feria, fue un reencuentro. Un espacio que volvió a unirnos, que nos recordó que estamos hechos para compartir, para construir juntos. La Lista 21 no sólo propuso una actividad; sembró esperanza, comunidad y alegría.\r\nLos organizadores agradecieron profundamente la participación masiva: \"Esto recién empieza. Nuestro barrio merece encuentros así, donde la emoción esté en cada rincón\", expresó uno de ellos entre aplausos.\r\nLa noche cerró con luces titilando y corazones contentos. Porque cuando el barrio se junta, todo es posible.','2025-04-27 00:00:00','/uploads/galeria/1752453079311.jpeg'),(4,'La Lista 21 ‘Nuestro Barrio’ Ganó las Elecciones”','El pasado 18 de mayo de 2025 quedará grabado en la memoria de nuestro barrio como un día histórico. La Lista 21 “Nuestro Barrio” logró una contundente victoria en las elecciones, y no fue solo un triunfo político—fue un grito de esperanza, de unidad y de sueños compartidos.\r\nDesde temprano, los vecinos se acercaron a votar con ilusión. Se respiraba un aire distinto, cargado de compromiso y alegría. Los abrazos, las lágrimas contenidas y las sonrisas cómplices contaban la historia de una comunidad que cree en sí misma.\r\nCuando se confirmó el resultado, los festejos no tardaron en llenar las calles. Banderas, cánticos y aplausos se entremezclaron en un torbellino de emociones. La plaza volvió a ser el centro del encuentro, con vecinos bailando, niños correteando y abrazos que decían más que mil palabras.\r\n“Ganamos porque estamos unidos, porque escuchamos, porque sentimos cada rincón de este barrio como propio”, expresó uno de los referentes de la Lista 21 con la voz entrecortada por la emoción.\r\nEste triunfo no es solo el fin de una campaña, sino el comienzo de una etapa llena de compromiso, trabajo colectivo y sueños por cumplir. Porque cuando el barrio elige con el corazón, el futuro florece.','2025-05-18 00:00:00','/uploads/galeria/1752453425732.jpeg'),(5,'Cierre de campaña de la Lista 21 \"Nuestro Barrio\"','El pasado sábado 16 de mayo de 2025 fue mucho más que el final de una campaña electoral; fue la celebración de un proceso profundamente humano, tejido con esperanza, esfuerzo y amor por nuestro barrio. La Lista 21 “Nuestro Barrio” cerró su campaña a pura emoción, rodeada de vecinos y vecinas que durante semanas caminaron, debatieron, propusieron y soñaron juntos.\r\nEn las ferias realizadas hubo música, juegos para los chicos, palabras sinceras y miradas cómplices. Pero sobre todo, hubo una energía colectiva que no se puede fingir: la de un pueblo que cree que otro futuro es posible.\r\n“Esta campaña fue con los pies en el barro y el corazón en alto. Escuchamos casa por casa, y eso es lo que nos hace distintos: somos vecinos antes que candidatos”, dijo una de las referentes de la lista, mientras los aplausos no paraban.\r\nNo fue un cierre, fue un comienzo. Porque lo que nació en esta campaña no termina en una elección: es una comunidad despierta, que sabe que la verdadera transformación empieza desde abajo, desde cerca, desde adentro.\r\nLa Lista 21 se despide de esta etapa con gratitud y orgullo, sabiendo que, pase lo que pase, ya se ganó lo más importante: la confianza de su gente.\r\n','2025-05-16 00:00:00','/uploads/galeria/1754156553882.jpeg');
/*!40000 ALTER TABLE `novedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos`
--

DROP TABLE IF EXISTS `reclamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `numeroReclamo` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'Pendiente',
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numeroReclamo` (`numeroReclamo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos`
--

LOCK TABLES `reclamos` WRITE;
/*!40000 ALTER TABLE `reclamos` DISABLE KEYS */;
INSERT INTO `reclamos` VALUES (2,'Paola','Valor','Isla verde 2152','paovalor@gmail.com','3513374727','Reclamo','Reclamo prueba....','REC-20250720-1037','Resuelto','2025-07-20 00:00:00'),(4,'Ignacio','Oviedo','Isla verde 2152','ignacio@gmail.com','3513353535','Alumbrado público','Una luminaria que se encuentra fuera de servicio en la vía pública. La misma está ubicada en [indicar dirección exacta, por ejemplo: Calle Falsa 123, entre Av. Siempreviva y Calle Real, Barrio Centro, Córdoba].\nLa luminaria lleva varios días sin funcionar, lo que genera una zona de oscuridad que representa un riesgo para la seguridad de los vecinos y transeúntes, especialmente durante la noche.\nSolicito que se realice la reparación o el reemplazo correspondiente a la brevedad posible.','REC-20250722-9265','Resuelto','2025-07-22 00:00:00'),(5,'Raul','Rodriguez','Carcano 5636','raul@gmail.com','3513363636','Ruidos molestos','Ruidos molestos','REC-20250722-4910','Resuelto','2025-07-22 00:00:00'),(6,'Susana','Garcia','Cajamarca 2545','susana@gmail.com','3515878787','Seguridad','Seguridad','REC-20250722-7549','Pendiente','2025-07-22 15:03:17'),(7,'Miguel','Ramirez','Isla Verde 2152','josepolvoraoviedo@gmail.com','03513374719','Alumbrado público','deeeeeeeeeeeeeeeeeeeeeeeeeeee','REC-20250724-3960','Resuelto','2025-07-24 00:00:00'),(8,'Manuel','Belgrano','San Martin 1200','manuel@gmail.com','3513252525','Alumbrado público','Hola, quería reportar que hay una luminaria quemada en [ubicación exacta, por ejemplo: “calle San Martín al 1200, frente al supermercado X”]. Está sin funcionar desde hace varios días y la zona queda muy oscura de noche, lo que puede ser peligroso para quienes pasan por ahí. ¿Podrían revisarla y arreglarla pronto? ¡Gracias!','REC-20250727-1038','Resuelto','2025-07-27 00:00:00'),(9,'Paola','Valor','isla verde 2152','paovalor@gmail.com','03513374719','Recolección de residuos','ttueoceonv odn ','REC-20250805-3883','Resuelto','2025-08-05 00:00:00'),(10,'Juan','Garcia','Cajamarca 2545','juangarcia@gmail.com','3513565656','Basurales','Basurales','REC-20250810-6280','Pendiente','2025-08-10 00:00:00'),(11,'Lucas','García ','Colon 564','lucasgarcia@gmail.com','3513252525','Poda de árboles','Poda','REC-20250816-5328','Pendiente','2025-08-15 00:00:00');
/*!40000 ALTER TABLE `reclamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revistas`
--

DROP TABLE IF EXISTS `revistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revistas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mes` varchar(255) NOT NULL,
  `pdf_url` varchar(255) NOT NULL,
  `paginas_carpeta` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `creado_en` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mes` (`mes`),
  UNIQUE KEY `mes_2` (`mes`),
  UNIQUE KEY `mes_3` (`mes`),
  UNIQUE KEY `mes_4` (`mes`),
  UNIQUE KEY `mes_5` (`mes`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revistas`
--

LOCK TABLES `revistas` WRITE;
/*!40000 ALTER TABLE `revistas` DISABLE KEYS */;
INSERT INTO `revistas` VALUES (1,'2025-07','/uploads/revistas/1752445915811.pdf','/uploads/revistas/paginas/2025-07','PRIMER TOMO ','2025-07-13 22:31:57');
/*!40000 ALTER TABLE `revistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL DEFAULT 'admin',
  `activo` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'Jose Martin','Oviedo','josepolvoraoviedo@gmail.com','$2b$10$G3esL1nFWbQptcQrM4jvmu8qhclz8XFC7vVbIuBM7psQh2ZI9Sij.','admin',1,'2025-08-05 23:26:16','2025-08-05 23:26:16'),(4,'Paola','Valor','paovalor79@gmail.com','$2b$10$YzkFYdIMT59Utn28Qo/zv.fWNTwdsEC4wr7NQQebgpqfojpKB4yRe','admin',1,'2025-08-05 23:48:24','2025-08-05 23:48:24'),(5,'Jose','Oviedo','josemartinoviedo@hotmail.com','$2b$10$KzXVArKZlDcXpwrrRoY3l.ixPlDLDiH/HsvfpSMVTJyfeQwP5mhji','admin',1,'2025-08-06 00:07:32','2025-08-06 00:07:32');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-17 17:35:15

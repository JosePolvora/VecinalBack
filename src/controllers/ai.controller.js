const axios = require("axios");
require("dotenv").config();

// Preguntas y respuestas precargadas
const preguntasPrecargadas = {
  "¿Cuál es la dirección del Centro Vecinal de Santa Isabel 2ª Sección?":
    "Cajamarca 2200.",

  "¿Qué actividades se realizan en el Centro Vecinal de Santa Isabel 2ª Sección?":
    "Próximamente se ofrecerán diversas actividades en el Centro Vecinal, incluyendo talleres, eventos comunitarios y espacios recreativos para todos los vecinos.",

  "¿Cómo puedo participar en el Centro Vecinal de Santa Isabel 2ª Sección?":
    "Podés comunicarte con cualquier miembro de la comisión y ponerte en contacto para solicitar tu participación.",

  "¿Cuál es el horario de atención del Centro Vecinal?":
    "El Centro Vecinal atiende de lunes a viernes de 9:00 a 17:00 hs. Durante estos horarios podés acercarte personalmente o comunicarte por teléfono.",

  "¿Qué servicios ofrece el Centro Vecinal?":
    "Estamos en proceso de organizar los servicios del Centro Vecinal. Próximamente ofreceremos asesoramiento, actividades recreativas y talleres para todos los vecinos.",

  "¿Cómo contactar al Centro Vecinal de Santa Isabel 2ª Sección?":
    "Para cualquier consulta, podés visitar nuestra sección de Contactos y comunicarte con nosotros",

  "¿Qué beneficios tiene estar involucrado en el Centro Vecinal?":
    "Formar parte del Centro Vecinal te permite conocer a otros vecinos, participar en decisiones comunitarias y disfrutar de actividades y eventos organizados para todos.",
};

exports.askQuestion = async (req, res) => {
  const { question } = req.body;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

  // Validación de pregunta
  if (!question || question.trim().length === 0) {
    return res.status(400).json({ error: "La pregunta no puede estar vacía." });
  }

  if (!GOOGLE_API_KEY) {
    console.error("Error: GOOGLE_API_KEY no está configurada.");
    return res
      .status(500)
      .json({
        error: "Error de configuración del servidor: API Key no encontrada.",
      });
  }

  // 1. Verificar si hay respuesta precargada
  if (preguntasPrecargadas[question]) {
    return res.json({
      question,
      answer: preguntasPrecargadas[question],
      source: "precargada",
    });
  }

  try {
    const payload = {
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
    };

    console.log("Enviando pregunta a Gemini:", question);

    // Configurar timeout en la solicitud para evitar bloqueos
    const response = await axios.post(API_URL, payload, {
      headers,
      timeout: 5000, // Timeout de 5 segundos
    });

    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts.length > 0
    ) {
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      return res.json({
        question,
        answer: aiResponse,
        source: "gemini",
      });
    } else {
      console.warn(
        "Respuesta de Gemini no contiene el texto esperado o fue bloqueada:",
        response.data
      );
      let reason = "La respuesta de la IA no pudo ser procesada.";
      if (
        response.data &&
        response.data.promptFeedback &&
        response.data.promptFeedback.blockReason
      ) {
        reason = `La solicitud fue bloqueada por: ${response.data.promptFeedback.blockReason}`;
      }
      return res.status(500).json({ error: reason, details: response.data });
    }
  } catch (error) {
    console.error(
      "Error al conectar con Google AI:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data && error.response.data.error) {
      return res.status(error.response.status || 500).json({
        error: "Error al procesar la solicitud con Google AI.",
        details: error.response.data.error.message,
      });
    }
    return res
      .status(500)
      .json({ error: "Error interno del servidor al conectar con Google AI." });
  }
};

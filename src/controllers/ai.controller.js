const axios = require('axios');
require('dotenv').config();

// Preguntas y respuestas precargadas
const preguntasPrecargadas = {
    "¿Cuál es la dirección del Centro Vecinal de Santa Isabel 2ª Sección?": "Cajamarca 2200.",

    "¿Qué actividades se realizan en el Centro Vecinal de Santa Isabel 2ª Sección?": "Permite conocer las propuestas recreativas, culturales, sociales o deportivas que se desarrollan para los vecinos del barrio.",

    "¿Quiénes forman parte de la comisión directiva del Centro Vecinal?": "Informa sobre las personas responsables de la conducción del centro vecinal, incluyendo cargos como presidente, secretario o tesorero.",

    "¿Cómo puedo participar en el Centro Vecinal de Santa Isabel 2ª Sección?": "Brinda detalles sobre cómo los vecinos pueden involucrarse en las actividades o decisiones del centro, ya sea como voluntarios o asistentes.",

    "¿Cuál es el horario de atención del Centro Vecinal?": "Informa los días y horarios en los que el centro vecinal está abierto al público para consultas, trámites o actividades.",

    "¿Qué servicios ofrece el Centro Vecinal?": "Detalla los servicios disponibles como asesoramiento legal, talleres, asistencia social, entre otros que pueda ofrecer el centro.",

    "¿Cómo contactar al Centro Vecinal de Santa Isabel 2ª Sección?": "Proporciona información de contacto como número de teléfono, correo electrónico o redes sociales para comunicarse con el centro.",

    "¿Qué beneficios tiene estar involucrado en el Centro Vecinal?": "Explica las ventajas de participar en la vida comunitaria, como acceso a información, toma de decisiones barriales y fortalecimiento del tejido social."

};

exports.askQuestion = async (req, res) => {
    const { question } = req.body;
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

    // Validación de pregunta
    if (!question || question.trim().length === 0) {
        return res.status(400).json({ error: 'La pregunta no puede estar vacía.' });
    }

    if (!GOOGLE_API_KEY) {
        console.error('Error: GOOGLE_API_KEY no está configurada.');
        return res.status(500).json({ error: 'Error de configuración del servidor: API Key no encontrada.' });
    }

    // 1. Verificar si hay respuesta precargada
    if (preguntasPrecargadas[question]) {
        return res.json({
            question,
            answer: preguntasPrecargadas[question],
            source: "precargada"
        });
    }

    try {
        const payload = {
            contents: [
                {
                    parts: [
                        { text: question }
                    ]
                }
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        console.log("Enviando pregunta a Gemini:", question);

        // Configurar timeout en la solicitud para evitar bloqueos
        const response = await axios.post(API_URL, payload, {
            headers,
            timeout: 5000  // Timeout de 5 segundos
        });

        if (response.data && response.data.candidates && response.data.candidates.length > 0 &&
            response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts.length > 0) {

            const aiResponse = response.data.candidates[0].content.parts[0].text;
            return res.json({
                question,
                answer: aiResponse,
                source: "gemini"
            });
        } else {
            console.warn("Respuesta de Gemini no contiene el texto esperado o fue bloqueada:", response.data);
            let reason = "La respuesta de la IA no pudo ser procesada.";
            if (response.data && response.data.promptFeedback && response.data.promptFeedback.blockReason) {
                reason = `La solicitud fue bloqueada por: ${response.data.promptFeedback.blockReason}`;
            }
            return res.status(500).json({ error: reason, details: response.data });
        }
    } catch (error) {
        console.error('Error al conectar con Google AI:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.error) {
            return res.status(error.response.status || 500).json({
                error: 'Error al procesar la solicitud con Google AI.',
                details: error.response.data.error.message
            });
        }
        return res.status(500).json({ error: 'Error interno del servidor al conectar con Google AI.' });
    }
};

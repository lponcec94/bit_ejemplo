const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(express.json()); // Para leer el cuerpo de las peticiones JSON
app.use(express.static('public')); // Para servir archivos estáticos

// 1. Configuración de la API Key (Seguridad)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/consultar', async (req, res) => {
    const { prompt, contextoSocial } = req.body;

    try {
        // 2. Selección del modelo (Flash es ideal por costo/velocidad para WebApps)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 3. System Instruction: Aquí es donde ocurre la magia del "Impacto Social"
        const promptEstructurado = `
            Actúa como un asesor experto en proyectos de impacto social. 
            Contexto del usuario: ${contextoSocial}
            Pregunta: ${prompt}
            
            Responde en formato JSON estrictamente con esta estructura:
            {
                "respuesta": "tu consejo aquí",
                "pasos_a_seguir": ["paso 1", "paso 2"],
                "recursos_sugeridos": ["recurso 1"]
            }
        `;

        const result = await model.generateContent(promptEstructurado);
        const response = await result.response;
        const text = response.text();

        // 4. Limpieza del texto (Gemini a veces envuelve el JSON en bloques de código)
        const jsonResponse = JSON.parse(text.replace(/```json|```/g, ""));
        
        res.json(jsonResponse);

    } catch (error) {
        console.error("Error con Gemini:", error);
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud" });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        endpoint: '/api/consultar'
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
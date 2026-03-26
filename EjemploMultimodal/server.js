const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json()); // Para leer el cuerpo de las peticiones JSON
app.use(express.static('public')); // Para servir archivos estáticos

// Configuración de Multer para subir archivos
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB límite
    },
    fileFilter: (req, file, cb) => {
        // Aceptar solo archivos de imagen
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    }
});

// 1. Configuración de la API Key (Seguridad)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint para consultas con soporte multimodal
app.post('/api/consultar', upload.single('imagen'), async (req, res) => {
    const { prompt, contextoSocial } = req.body;
    const imagen = req.file;

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            // ¡EL TRUCO PRO!: Forzamos a que la respuesta sea un JSON puro
            generationConfig: { responseMimeType: "application/json" } 
        });

        // Preparamos el array de contenido
        let contenido = [];
        
        const promptEstructurado = `
            Actúa como un asesor experto en proyectos de impacto social. 
            Contexto del usuario: ${contextoSocial}
            Pregunta: ${prompt}
            
            ${imagen ? 'Analiza también la imagen proporcionada para dar una respuesta más contextualizada.' : ''}
            
            Responde estrictamente con esta estructura JSON:
            {
                "respuesta": "tu consejo aquí",
                "pasos_a_seguir": ["paso 1", "paso 2"],
                "recursos_sugeridos": ["recurso 1"],
                "analisis_imagen": "análisis de la imagen si está presente" 
            }
        `;
        
        // El SDK acepta strings directamente en el array
        contenido.push(promptEstructurado);
        
        if (imagen) {
            contenido.push({
                inlineData: {
                    data: imagen.buffer.toString('base64'),
                    mimeType: imagen.mimetype
                }
            });
        }

        const result = await model.generateContent(contenido);
        const text = result.response.text();

        // Como usamos responseMimeType, 'text' YA ES un string de JSON válido.
        // No necesitamos Regex, solo parsear directamente.
        const jsonResponse = JSON.parse(text);
        
        res.json(jsonResponse);

    } catch (error) {
        console.error("Error con Gemini:", error);
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud" });
    }
});

// Endpoint para consultas solo de texto (sin imagen)
app.post('/api/consultar-texto', async (req, res) => {
    const { prompt, contextoSocial } = req.body;

    try {
        // Usar gemini-2.5-flash para solo texto (más económico)
        const model =  genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" } 
        });

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

        // Limpieza del texto (Gemini a veces envuelve el JSON en bloques de código)
        let cleanedText = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
            .trim();
        
        const jsonResponse = JSON.parse(cleanedText);
        
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
        endpoints: ['/api/consultar', '/api/consultar-texto'],
        features: ['text', 'image-upload', 'multimodal']
    });
});

// Endpoint para verificar formato de imagen
app.get('/api/image-info', (req, res) => {
    res.json({
        supportedFormats: ['JPEG', 'PNG', 'GIF', 'BMP', 'WEBP'],
        maxSize: '10MB',
        maxDimensions: 'No specific limit (recommended: < 2048x2048)'
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor multimodal corriendo en http://localhost:${PORT}`));

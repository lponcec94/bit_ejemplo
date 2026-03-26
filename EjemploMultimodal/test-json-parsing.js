// Quick test to verify the JSON parsing fix
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testJSONParsing() {
    try {
        console.log('🧪 Testing JSON parsing with Gemini...');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
            Responde en formato JSON estrictamente con esta estructura:
            {
                "respuesta": "tu consejo aquí",
                "pasos_a_seguir": ["paso 1", "paso 2"],
                "recursos_sugeridos": ["recurso 1"]
            }
            
            Pregunta: ¿Cómo puedo mejorar mi proyecto social?
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('📝 Raw response:', text);
        
        // Apply the same cleaning logic as in server
        let cleanedText = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
            .trim();
        
        console.log('🧹 Cleaned text:', cleanedText);
        
        const jsonResponse = JSON.parse(cleanedText);
        console.log('✅ Parsed JSON:', jsonResponse);
        
        console.log('\n🎉 JSON parsing test successful!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testJSONParsing();

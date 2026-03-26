// Test file to verify the setup works
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('🔍 Testing Gemini API connection...');

try {
    // Check if API key is loaded
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not found in .env file');
    }
    
    console.log('✅ API Key loaded successfully');
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI client initialized');
    
    // Test connection (optional - uncomment to test actual API call)
    /*
    async function testConnection() {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent('Test message');
        console.log('✅ API connection successful');
    }
    
    testConnection().catch(console.error);
    */
    
    console.log('🚀 Setup is ready! You can now run: node server.js');
    
} catch (error) {
    console.error('❌ Setup error:', error.message);
}

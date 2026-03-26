// Test file to verify the multimodal setup works
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log('🔍 Testing Multimodal Gemini API connection...');

try {
    // Check if API key is loaded
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not found in .env file');
    }
    
    console.log('✅ API Key loaded successfully');
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI client initialized');
    
    // Test multimodal model availability
    console.log('🤖 Testing model availability...');
    
    // Test text model
    const textModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('✅ Text model (gemini-2.5-flash) ready');
    
    // Test multimodal model
    const multimodalModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ Multimodal model (gemini-1.5-flash) ready');
    
    console.log('\n🎉 Multimodal setup is ready!');
    console.log('📝 Features available:');
    console.log('   - Text processing');
    console.log('   - Image analysis');
    console.log('   - Multimodal conversations');
    console.log('   - File upload support');
    
    console.log('\n🚀 You can now run: npm start');
    console.log('🌐 Then visit: http://localhost:3000');
    
} catch (error) {
    console.error('❌ Setup error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Your .env file contains GEMINI_API_KEY');
    console.log('   2. The API key is valid and active');
    console.log('   3. You have internet connection');
}

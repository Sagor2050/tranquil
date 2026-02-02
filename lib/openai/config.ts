import OpenAI from 'openai';

// Initialize OpenAI client
// TODO: Add your OpenAI API key to .env.local
// OPENAI_API_KEY=your_api_key_here
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default openai;

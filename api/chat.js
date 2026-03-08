import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// These come from the Environment Variables you just added to Vercel
const supabaseUrl = process.env.VITE_SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);

export default async function handler(req, res) {
  // We only want to handle POST requests (when the user sends a question)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Please ask a question!' });
  }

  try {
    // 1. Search your Supabase 'tools' table for relevant tools
    const { data: tools, error } = await supabase
      .from('tools')
      .select('name, description, link, pricing_type')
      .textSearch('description', question.split(' ').join(' | '), {
        type: 'websearch',
        config: 'english'
      })
      .limit(5);

    if (error) throw error;

    // 2. Prepare the prompt for Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert AI assistant for Toolsy, an AI tools directory.
      User Question: "${question}"
      
      Here are tools from our database that might match:
      ${JSON.stringify(tools || [])}
      
      Task:
      - If there are tools in the list, recommend the best one(s) based on the user's needs.
      - If the user wants "free" tools, focus on those marked 'Free' or 'Freemium'.
      - If the list is empty, suggest a popular AI tool from your general knowledge but mention "It's not listed on Toolsy yet".
      - Keep your tone friendly, helpful, and concise (max 3 sentences).
    `;

    // 3. Get the answer from Gemini
    const result = await model.generateContent(prompt);
    const aiAnswer = result.response.text();

    // 4. Send the answer and the tool data back to the website
    return res.status(200).json({ 
      answer: aiAnswer, 
      tools: tools || [] 
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong with the AI' });
  }
}

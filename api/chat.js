import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Environment variables from Vercel
const supabaseUrl = process.env.VITE_SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Please ask a question!' });
  }

  try {
    // 🔍 FAST SEARCH: Look for the question keywords in Name or Description
    const { data: tools, error } = await supabase
      .from('tools')
      .select('name, description, link, pricing_type')
      .or(`name.ilike.%${question}%,description.ilike.%${question}%`)
      .limit(8);

    if (error) {
      console.error("Supabase Search Error:", error);
    }

    // 🧠 THINK: Initialize Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert AI consultant for Toolsy, India's largest AI tools hub.
      User Question: "${question}"
      
      Tools currently in our database:
      ${JSON.stringify(tools || [])}
      
      Instructions:
      1. If the database has matching tools, recommend them clearly.
      2. If the user mentions "free", prioritize "Free" or "Freemium" tools.
      3. If no tools match, suggest one from your own knowledge but say "It's not on Toolsy yet".
      4. Keep it very concise (max 2-3 sentences).
    `;

    const result = await model.generateContent(prompt);
    const aiAnswer = result.response.text();

    return res.status(200).json({ 
      answer: aiAnswer, 
      tools: tools || [] 
    });

  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: 'Something went wrong with the AI' });
  }
}

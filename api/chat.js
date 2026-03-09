// 1. MAGIC FIX: Load the secret keys from your file
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 2. KEYS
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

// 3. SETUP
const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey || "MISSING_KEY");

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { question } = req.body;
  console.log("🧠 Brain received:", question);

  try {
    // 4. DATABASE SEARCH
    const { data: tools, error } = await supabase
      .from('tools')
      .select('name, description, link') 
      .ilike('description', `%${question}%`)
      .limit(3);
    
    if (error) console.error("Supabase Search Error:", error.message);

    // 5. ASK GEMINI (✅ NEW NUMBER: gemini-2.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `User asked: "${question}". Context: ${JSON.stringify(tools || [])}. Answer in 1 short sentence.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🤖 AI Answered:", text);
    return res.status(200).json({ answer: text });

  } catch (error) {
    console.error("💥 SERVER ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

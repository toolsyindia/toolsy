import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // 1. Check if keys even exist in Vercel
  const keysFound = {
    gemini: !!process.env.GEMINI_API_KEY,
    supabaseUrl: !!(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL),
    supabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  };

  if (!keysFound.gemini || !keysFound.supabaseUrl || !keysFound.supabaseKey) {
    return res.status(500).json({ 
      error: "Missing Keys in Vercel!", 
      diagnostic: keysFound 
    });
  }

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question" });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Test Gemini connection directly first
    const result = await model.generateContent("Say 'System Online'");
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ 
      answer: `Gemini is working! It says: ${text}. Now try asking for a tool.` 
    });

  } catch (err) {
    console.error("DIAGNOSTIC ERROR:", err.message);
    // This will tell us if it's an "API Key Invalid" or "Network" error
    return res.status(500).json({ 
      error: "Gemini Fetch Failed", 
      details: err.message 
    });
  }
}
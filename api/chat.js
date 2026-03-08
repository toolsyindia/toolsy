import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Bulletproof Key Loading
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;

  try {
    // 2. Ultra-Fast Search
    const { data: tools } = await supabase
      .from('tools')
      .select('name, description, link, pricing_type')
      .or(`name.ilike.%${question}%,description.ilike.%${question}%`)
      .limit(5);

    // 3. High-Speed AI Response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `User asked: ${question}. Recommend from these tools: ${JSON.stringify(tools || [])}. Keep it under 2 sentences.`;

    const result = await model.generateContent(prompt);
    const aiAnswer = result.response.text();

    // 4. Send it back immediately
    return res.status(200).json({ answer: aiAnswer });

  } catch (err) {
    // This will show up in your Vercel Dashboard Logs
    console.error("CRITICAL AI ERROR:", err);
    return res.status(500).json({ error: "AI logic failed. Check Vercel Logs." });
  }
}
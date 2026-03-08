import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'No POST' });

  const { question } = req.body;

  try {
    // 1. Quick DB Search
    const { data: tools } = await supabase
      .from('tools')
      .select('name, description, link, pricing_type')
      .or(`name.ilike.%${question}%,description.ilike.%${question}%`)
      .limit(5);

    // 2. Initialize Gemini with extra safety
    if (!geminiKey) throw new Error("GEMINI_API_KEY is missing in Vercel!");
    
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are Toolsy AI. User asked: ${question}. Context: ${JSON.stringify(tools || [])}. Reply in 2 sentences.`;

    // 3. Get response
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ answer: text });

  } catch (err) {
    // This logs the EXACT reason for the "FetchError" to your Vercel Dashboard
    console.error("DETAILED AI ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
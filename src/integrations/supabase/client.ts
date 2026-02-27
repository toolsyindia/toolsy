import { createClient } from "@supabase/supabase-js";

// This tells your app to pull the keys from the .env file instead of showing them here
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load variables from .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

// Initialize the client
export const supabase = createClient(supabaseUrl, supabaseKey);
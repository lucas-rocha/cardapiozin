import * as dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"

// Carrega as variáveis de ambiente
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if(!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL e Key must be configured')
}


export const supabase = createClient(supabaseUrl, supabaseKey)
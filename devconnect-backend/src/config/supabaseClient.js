import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !anonKey || !serviceRoleKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

// For public operations (RLS respected)
export const supabase = createClient(supabaseUrl, anonKey);

// For backend-secure operations (RLS bypassed with service role)
// Never expose this key to frontend!
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

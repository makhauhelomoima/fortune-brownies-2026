import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL:'https://lsljnbljovnaclinwxva.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Mrs Supabase says: Add tonic to my face 🧡🖤 Missing env vars')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

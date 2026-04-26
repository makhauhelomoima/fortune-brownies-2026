import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lsljnbljovnaclinwxva.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NTY5NzIsImV4cCI6MjA2MDUzMjk3Mn0.h3sMJE0J3rsG8NuF2S1iCn1JZi16i1Xm57GquYrnqbq32LxMKcawK3E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ioknjsejftetmbgcxqtg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva25qc2VqZnRldG1iZ2N4cXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTMyOTgsImV4cCI6MjA2NzI4OTI5OH0.adpT6-FlJY1_g9wRfHL3S_g6Js4o2tuW7MXMvS-ZIfw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

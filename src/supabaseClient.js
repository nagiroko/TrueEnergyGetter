import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahugqjdzucmanyidnkvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodWdxamR6dWNtYW55aWRua3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NzU4NTAsImV4cCI6MjAzNTM1MTg1MH0.IuXYrEZNedL3KUJs40Ur4BVXsien7BlgbB9CJmUPp4I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
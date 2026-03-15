import { createClient} from "@supabase/supabase-js";

const supabaseURL = 'https://kjnfkqlamtjivdbkdtiu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbmZrcWxhbXRqaXZkYmtkdGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzYzMTQsImV4cCI6MjA4NzExMjMxNH0.uQHX755ZXFhkXyMJtCXednipouy4UKxCsg5qCNohMeg';

export const supabaseClient = createClient(supabaseURL,supabaseKey);

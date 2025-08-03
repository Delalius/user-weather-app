import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sasongcwqfxxolyxbkbm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc29uZ2N3cWZ4eG9seXhia2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDM3MTksImV4cCI6MjA2OTQ3OTcxOX0.imvFkJ_7JEDbTIZbtkLC2DQiA3zHNFm4NpKzbIkgKOo";

export const supabase = createClient(supabaseUrl, supabaseKey);

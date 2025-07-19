import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./tempENV";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

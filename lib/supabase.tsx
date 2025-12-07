import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vqojtjcavwmqkkmyupvt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb2p0amNhdndtcWtrbXl1cHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTgzMzEsImV4cCI6MjA4MDQ3NDMzMX0.fp6l_J44Wgdh8sZhTvjW-Rn49S4qHsWiWRKItIkwN4U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
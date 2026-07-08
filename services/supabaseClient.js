import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const { supabaseUrl, supabaseAnonKey } = extra;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase no está configurado: revisa 'extra.supabaseUrl' y 'extra.supabaseAnonKey' en app.json, " +
    "y reinicia con 'npx expo start -c' (no solo recargar la app)."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
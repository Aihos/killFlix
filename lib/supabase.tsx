import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const SUPABASE_URL = "https://vqojtjcavwmqkkmyupvt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb2p0amNhdndtcWtrbXl1cHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTgzMzEsImV4cCI6MjA4MDQ3NDMzMX0.fp6l_J44Wgdh8sZhTvjW-Rn49S4qHsWiWRKItIkwN4U";

// Storage personnalisé qui fonctionne sur web et mobile
const customStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return null;
    }
    // Pour mobile, utiliser AsyncStorage
    const AsyncStorage = (
      await import("@react-native-async-storage/async-storage")
    ).default;
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
      return;
    }
    const AsyncStorage = (
      await import("@react-native-async-storage/async-storage")
    ).default;
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      return;
    }
    const AsyncStorage = (
      await import("@react-native-async-storage/async-storage")
    ).default;
    await AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },
});

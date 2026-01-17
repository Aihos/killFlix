import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilPage() {
  const { user, profile, loading, signIn, signUp, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères",
      );
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          Alert.alert("Erreur de connexion", error.message);
        }
      } else {
        const { error } = await signUp(email, password, username, fullName);
        if (error) {
          // Afficher le message d'erreur complet
          console.log("Erreur inscription:", error);
          Alert.alert(
            "Erreur d'inscription",
            error.message || "Une erreur est survenue",
          );
        } else {
          Alert.alert(
            "Inscription réussie",
            "Votre compte a été créé avec succès",
          );
          setIsLogin(true);
        }
      }
    } catch {
      Alert.alert("Erreur", "Une erreur inattendue s'est produite");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    if (Platform.OS === "web") {
      // Sur le web, utiliser confirm natif
      const confirmed = window.confirm(
        "Êtes-vous sûr de vouloir vous déconnecter ?",
      );
      if (confirmed) {
        await signOut();
      }
    } else {
      // Sur mobile, utiliser Alert
      Alert.alert(
        "Déconnexion",
        "Êtes-vous sûr de vouloir vous déconnecter ?",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Déconnexion", onPress: signOut, style: "destructive" },
        ],
      );
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f0f23"]}
        style={[styles.container, styles.centered]}
      >
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </LinearGradient>
    );
  }

  // Si l'utilisateur est connecté, afficher le profil
  if (user) {
    const displayName =
      profile?.full_name ||
      profile?.username ||
      user.email?.split("@")[0] ||
      "Utilisateur";
    const displayEmail = user.email || "Email non disponible";
    const createdAt = profile?.created_at || user.created_at;

    return (
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f0f23"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[colors.tint, "#ff9a9e"]}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>
                    {displayName[0].toUpperCase()}
                  </Text>
                </LinearGradient>
              </View>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileEmail}>{displayEmail}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Informations du compte</Text>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <IconSymbol
                    name="person.fill"
                    size={20}
                    color={colors.tint}
                  />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Nom</Text>
                    <Text style={styles.infoValue}>
                      {profile?.username || displayName}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <IconSymbol
                    name="envelope.fill"
                    size={20}
                    color={colors.tint}
                  />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{displayEmail}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <IconSymbol name="calendar" size={20} color={colors.tint} />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Membre depuis</Text>
                    <Text style={styles.infoValue}>
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Date inconnue"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              <IconSymbol
                name="rectangle.portrait.and.arrow.right"
                size={20}
                color="#fff"
              />
              <Text style={styles.signOutText}>Se déconnecter</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Formulaire de connexion / inscription
  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f0f23"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.authScrollContent}>
            <View style={styles.authHeader}>
              <LinearGradient
                colors={[colors.tint, "#ff9a9e"]}
                style={styles.logoContainer}
              >
                <IconSymbol name="person.fill" size={40} color="#fff" />
              </LinearGradient>
              <Text style={styles.authTitle}>
                {isLogin ? "Connexion" : "Inscription"}
              </Text>
              <Text style={styles.authSubtitle}>
                {isLogin
                  ? "Connectez-vous pour accéder à votre profil"
                  : "Créez un compte pour commencer"}
              </Text>
            </View>

            <View style={styles.formContainer}>
              {!isLogin && (
                <>
                  <View style={styles.inputContainer}>
                    <IconSymbol name="person" size={20} color="#888" />
                    <TextInput
                      style={styles.input}
                      placeholder="Nom d'utilisateur"
                      placeholderTextColor="#888"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <IconSymbol name="person.fill" size={20} color="#888" />
                    <TextInput
                      style={styles.input}
                      placeholder="Nom complet"
                      placeholderTextColor="#888"
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>
                </>
              )}

              <View style={styles.inputContainer}>
                <IconSymbol name="envelope.fill" size={20} color="#888" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={20} color="#888" />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: colors.tint },
                  isSubmitting && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {isLogin ? "Se connecter" : "S'inscrire"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text style={styles.switchText}>
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : "Déjà un compte ? Se connecter"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  keyboardView: {
    flex: 1,
  },
  authScrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 5,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  authHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  submitButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switchButton: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    color: "#888",
    fontSize: 14,
  },
});

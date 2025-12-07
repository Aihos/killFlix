import { StyleSheet, Text, View, ScrollView, ActivityIndicator, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { Movie } from '@/utils/movieUtills'
import HeaderPage from '@/components/headerPage'
import { TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

const FilmDetail = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('film')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError(error.message);
        } else if (data) {
          setFilm(data as Movie);
        } else {
          setError('Film introuvable');
        }
      } catch {
        setError('Erreur de connexion');
      }

      setLoading(false);
    };

    if (id) {
      fetchFilm();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  if (error || !film) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Erreur</Text>
        <Text style={{ color: '#999', marginTop: 8, fontSize: 12 }}>
          {error || 'Film introuvable'}
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderPage />
      
      <ImageBackground
        source={{ uri: film.img_film }}
        style={styles.posterImage}
        imageStyle={{ borderRadius: 0 }}
      >
        <View style={styles.posterOverlay} />
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>{film.nom_film}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoText}>
              {new Date(film.date_film).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          
          <View style={styles.infoBadge}>
            <Text style={styles.infoLabel}>Durée</Text>
            <Text style={styles.infoText}>{film.duree_film} min</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Réalisateur</Text>
          <Text style={styles.sectionText}>{film.realisateur_film}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.description}>{film.desc_film}</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Retour à la galerie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FilmDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  posterImage: {
    width: width,
    height: 500,
    justifyContent: 'flex-end',
  },
  posterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoBadge: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#ccc',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

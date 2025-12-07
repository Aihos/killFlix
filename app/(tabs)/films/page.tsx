import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Movie } from '@/utils/movieUtills'
import { router } from 'expo-router'
import HeaderPage from '@/components/headerPage'

const FilmsGallery = () => {
  const [films, setFilms] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('film')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
        } else if (data) {
          setFilms(data as Movie[]);
        } else {
          setError('Aucun film disponible');
        }
      } catch {
        setError('Erreur de connexion');
      }

      setLoading(false);
    };

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Erreur</Text>
        <Text style={{ color: '#999', marginTop: 8, fontSize: 12 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderPage />
      <Text style={styles.title}>Galerie de Films</Text>
      
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/films/${item.id}/page`)}
          >
            <ImageBackground
              source={{ uri: item.img_film }}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.filmTitle} numberOfLines={2}>
                  {item.nom_film}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilmsGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  listContent: {
    padding: 12,
  },
  card: {
    flex: 1,
    margin: 6,
    maxWidth: '48%',
  },
  cardImage: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  filmTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

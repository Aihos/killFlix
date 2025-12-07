
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import HeroHeader from '@/components/heroHeader';
import HeaderPage from '@/components/headerPage';
import VedetteFilm from '@/components/VedetteFilm';
import { Movie } from '@/utils/movieUtills'
import React, { use, useEffect, useState } from 'react';
import {supabase} from '@/lib/supabase'
import RecemmentAjoute from '@/components/RecemmentAjoute';





export default function HomeScreen() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  /*  const fetchLatestMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('film')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          setError(error.message);
        } else if (data && data.length > 0) {
          setMovie(data[0] as Movie);
        } else {
          setError('Aucun film disponible');
        }
      } catch {
        setError('Erreur de connexion');
      }

      setLoading(false);
    }; */

    const fetchAllMovies = async () => {

      setLoading(true);
      setError(null);

      try{
        const {data, error} = await supabase
        .from('film')
        .select('*')
        .order('created_at', {ascending : false})
        .limit(5)

       if (error) {
          setError(error.message);
        } else if (data && data.length > 0) {
          setAllMovies(data as Movie[]);
          setMovie(data[1] as Movie);
          console.log(allMovies)
        } else {
          setError('Aucun film disponible');
        }


      } catch (e) {

        console.log(e)
      }
      setLoading(false);
    }



  useEffect(() => {
    fetchAllMovies();
   /*  fetchLatestMovie(); */
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff', fontSize: 16 }}>
          Impossible de charger le film
        </Text>
        <Text style={{ color: '#999', marginTop: 8, fontSize: 12 }}>
          {error || 'Aucune donnée disponible'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <HeaderPage />
      <HeroHeader titre={movie.nom_film} url={movie.img_film} id={movie.id}/>
      <VedetteFilm allMovies={allMovies}  />
      <RecemmentAjoute />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

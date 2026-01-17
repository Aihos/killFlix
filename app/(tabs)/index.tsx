
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import HeroHeader from '@/components/heroHeader';
import HeaderPage from '@/components/headerPage';
import VedetteFilm from '@/components/VedetteFilm';
import { Movie } from '@/utils/movieUtills'
import React, { use, useEffect, useState } from 'react';
import {supabase} from '@/lib/supabase'
import RecemmentAjoute from '@/components/RecemmentAjoute';
import BlocActeurFilms from '@/components/BlocActeurFilms';
import MiseEnAvant from '@/components/MiseEnAvant';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

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
        <ActivityIndicator size="large" color="#cf4f4f" />
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
    <ScrollView  style={styles.container}>
        <HeaderPage />
        <HeroHeader titre={movie.nom_film} url={movie.img_film} id={movie.id}/>
        <BlurView intensity={60} tint="dark" style={styles.stepContainer}>
        <VedetteFilm allMovies={allMovies}  />
        <RecemmentAjoute allMovies={allMovies} />
        <BlocActeurFilms />
        < MiseEnAvant allMovies={allMovies}/>
        </BlurView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   zIndex: 0,
    position: 'relative',
     paddingBottom: 35, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
 stepContainer: {
  zIndex: 2,
  marginTop: -20,
  paddingTop: 20,
  gap: 8,
  marginBottom: 8,
 /*  borderWidth: 1, */
 /*  borderColor: 'rgba(28, 169, 0, 1)', */
  borderRadius: 12,
  paddingBottom: 16,
  paddingHorizontal: 0,
  overflow: 'hidden',
  backgroundColor: 'rgba(35, 10, 10, 0.6)',
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

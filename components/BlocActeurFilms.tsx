import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Movie } from '@/utils/movieUtills'
import { supabase } from '@/lib/supabase';

interface Acteur {
  id: number;
  created_at: string;
  nom_acteur: string;
  prenom_acteur: string;
  idFilms: number[];   // 🔥 ATTENTION : array d'ID, pas Movie[]
}

const BlocActeurFilms = ({ idActeur = 2 }: { idActeur?: number }) => {

  const [acteur, setActeur] = React.useState<Acteur>()
  const [films, setFilms] = React.useState<Movie[]>([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchActeur = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('acteurs')
          .select('*')
          .eq('id', idActeur)
          .limit(1);

        if (error) {
          console.log('Erreur acteur : ', error.message);
          return;
        }

        if (!data || data.length === 0) {
          console.log("Aucun acteur trouvé", error);
          return;
        }

        const acteur = data[0];
        setActeur(acteur);
        
        // Si pas de films → stop
        if (!acteur.idFilms || acteur.idFilms.length === 0) {
          setFilms([]);
          return;
        }

        const { data: filmsData, error: errFilms } = await supabase
          .from('film')
          .select('*')
          .in('id', acteur.idFilms);

        if (errFilms) {
          console.log('Erreur films : ', errFilms.message);
        } else if (filmsData) {
          setFilms(filmsData as Movie[]);
        }

      } catch (e) {
        console.log("Erreur fetchActeur :", e);
      } finally {
        setLoading(false);
      }
    }

    fetchActeur();
  }, [idActeur]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.filmTitle}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Films de {acteur ? `${acteur.prenom_acteur} ${acteur.nom_acteur}` : "l'acteur"}
      </Text>

      {films.length > 0 ? (
        <FlatList 
          style={styles.listFilms}
          contentContainerStyle={styles.listContent}
          data={films}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.filmItem}>
              <Image source={{ uri: item.img_film }} style={styles.blocFIlms} />
              <Text style={styles.filmTitle} numberOfLines={2}>
                {item.nom_film}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.filmTitle}>Aucun film disponible</Text>
      )}
    </View>
  )
}

export default BlocActeurFilms

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  listFilms: {
    paddingHorizontal: 10,
  },
  listContent: {
    gap: 10,
    paddingHorizontal: 6,
  },
  filmItem: {
    marginRight: 10,
    width: 120,
  },
  blocFIlms: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  filmTitle: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  }
});

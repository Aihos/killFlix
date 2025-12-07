import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '@/utils/movieUtills'

const MiseEnAvant = ({allMovies}: {allMovies:Movie[]}) => {
    const [filmsRecents, setFilmsRecents] = useState<Movie[]>([]);

    useEffect(() =>{
         
    const sorted = [...allMovies].sort((a, b) => b.id - a.id);
    setFilmsRecents(sorted.slice(0, 5));
        
         
    }, [allMovies])
    
      useEffect(() => {
        console.log("Films récents mis à jour:", filmsRecents);
    }, [filmsRecents])

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <FlatList 
        style={styles.listFilms}
        contentContainerStyle={styles.listContent}
        data={filmsRecents}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
            <View style={styles.filmItem}>
                <Image source={{uri: item.img_film}} style={styles.blocFIlms} />
                <Text style={[styles.filmTitle, { position: 'absolute', bottom: 10, left: 10 }]} numberOfLines={2}>{item.nom_film}</Text>
            </View>
        )}
      />
    </View>
  )
}

export default MiseEnAvant

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
        position: 'relative',
        marginRight: 10,
        width: 320,
    },
    blocFIlms: {
        width: 320,
        height: 180,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    filmTitle: {
        color: '#fff',
        marginTop: 8,
        fontSize: 14,
         backgroundColor: '#bfbebe61',
        backdropFilter: 'blur(5px)',
        padding: 8,
        borderRadius: 4,
    }
})
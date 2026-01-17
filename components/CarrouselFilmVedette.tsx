import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Movie } from '@/utils/movieUtills'
import { Link } from 'expo-router'

const CarrouselFilmVedette = ({allMovies}: {allMovies:Movie[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < allMovies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Retour au début
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(allMovies.length - 1); // Aller à la fin
    }
  };

  // Calculer les indices pour chaque position
  const getMovieIndex = (offset: number) => {
    const index = (currentIndex + offset) % allMovies.length;
    return index < 0 ? allMovies.length + index : index;
  };

  return (
    <View style={styles.container}>
      {/* carousel  */}

    
     <Link href={`/films/${allMovies[getMovieIndex(0)].id}/page`} asChild>
       <TouchableOpacity style={{zIndex:5}}>
         <ImageBackground source={{ uri: allMovies[getMovieIndex(0)].img_film }} style={styles.imgCarrousel1} imageStyle={{ borderRadius: 10 }} />
       </TouchableOpacity>
     </Link>
     <Link href={`/films/${allMovies[getMovieIndex(-1)].id}/page`} asChild>
       <TouchableOpacity style={{zIndex:2}}>
         <ImageBackground source={{ uri: allMovies[getMovieIndex(-1)].img_film }} style={styles.imgCarrousel2} imageStyle={{ borderRadius: 10 }} />
       </TouchableOpacity>
     </Link>

     <Link href={`/films/${allMovies[getMovieIndex(1)].id}/page`} asChild>
       <TouchableOpacity style={{zIndex:2}}>
         <ImageBackground source={{ uri: allMovies[getMovieIndex(1)].img_film }} style={styles.imgCarrousel3} imageStyle={{ borderRadius: 10 }} />
       </TouchableOpacity>
     </Link>

     <Link href={`/films/${allMovies[getMovieIndex(-2)].id}/page`} asChild>
       <TouchableOpacity style={{zIndex:1}}>
         <ImageBackground source={{ uri: allMovies[getMovieIndex(-2)].img_film }} style={styles.imgCarrousel4} imageStyle={{ borderRadius: 10 }} />
       </TouchableOpacity>
     </Link>

     <Link href={`/films/${allMovies[getMovieIndex(2)].id}/page`} asChild>
       <TouchableOpacity style={{zIndex:1}}>
         <ImageBackground source={{ uri: allMovies[getMovieIndex(2)].img_film }} style={styles.imgCarrousel5} imageStyle={{ borderRadius: 10 }} />
       </TouchableOpacity>
     </Link>

      <TouchableOpacity style={styles.btnRight} onPress={handleNext}>
        <Text style={{ color: '#fff', fontSize: 16 }}>→</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.btnLeft} onPress={handlePrev}>
        <Text style={{ color: '#fff', fontSize: 16 }}>←</Text>
      </TouchableOpacity>

    </View>
  )
}

export default CarrouselFilmVedette

const styles = StyleSheet.create({

    container:{
        position:'relative',
        height:320,
        paddingTop:50,
    },
    imgCarrousel1:{
        position:'absolute',
        left:'50%',
        top:0,
        transform:[{translateX:-85}],
        width:171,
        height:213,
        borderRadius:10,
        zIndex:5,
    },

    imgCarrousel2:{
        position:'absolute',
        left:'20%',
         borderRadius:10,
        width:129,
        height:160,
        zIndex:2,
        top:30,
        
        },
    imgCarrousel3:{
        position:'absolute',
        right:'20%',
        borderRadius:10,
        width:129,
        height:160,
        zIndex:2,
        top:30,
    },
    imgCarrousel5:{
        position:'absolute',
        right:'10%',
        borderRadius:10,
        width:92,
        height:130,
        zIndex:1,
        top:45,
    },
    imgCarrousel4:{
        position:'absolute',
        left:'10%',
        borderRadius:10,
        width:92,
        height:130,
        zIndex:1,
        top:45,
    },
    btnRight:{
        position:'absolute',
        right:10,
        top:'45%',
        backgroundColor:'#00000088',
        padding:10,
        borderRadius:30,
        backdropFilter:'blur(40px)',
    },
    btnLeft:{
        position:'absolute',
        left:10,
        top:'45%',
        backgroundColor:'#00000088',
        padding:10,
        borderRadius:30,
        backdropFilter:'blur(40px)',
    }

})
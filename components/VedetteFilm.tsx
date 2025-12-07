import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarrouselFilmVedette from './CarrouselFilmVedette'
import { Movie } from '@/utils/movieUtills'

const VedetteFilm = ({allMovies} : {allMovies: Movie[]}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHDeuxVedette} >VedetteFilm</Text>
      <CarrouselFilmVedette allMovies={allMovies}  />
    </View>
  )
}

export default VedetteFilm

const styles = StyleSheet.create({

    container : {
        flex:1,
        justifyContent:'center',
    },
    textHDeuxVedette:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        color:'#fff',
        marginBottom:20,
    }


})
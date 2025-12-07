

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import Loupe from './svg/loupe'
import { router } from 'expo-router'

const HeaderPage = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image source={"https://media.pathe.fr/files/logo/logo.svg"} style={{width:100, height:50}} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => console.log('Search pressed')}>
         {/* <Image source={"https://i.pinimg.com/736x/b4/f9/ef/b4f9ef87c592af0145044285cdc1f706.jpg"} style={{width:30, height:30}} /> */}
         <Loupe />
      </TouchableOpacity>
        </View>
  )
}

export default HeaderPage

const styles = StyleSheet.create({

    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:16,
        position:'absolute',
        top:20,
        width:'100%',
        zIndex:10,
      
    },
    btn : {
        backgroundColor:'#ffffff88',
        padding:8,
        borderRadius:10,
        backdropFilter:'blur(40px)',
    }
})
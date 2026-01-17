import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TicketSvg from './svg/ticket'
import { router } from 'expo-router'

const ButtonWach = ({id}: {id:number}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnWatch} onPress={() => router.push(`/films/${id}/page`)}>
        <TicketSvg />
        <Text style={styles.textWatch}>Réserver mainteant</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonWach

const styles = StyleSheet.create({

    btnWatch : {
        backgroundColor : "#FF7E7Eff",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        flex:1,
        width:'100%',
        paddingHorizontal:10,
    }, 
    textWatch : {
        padding:12,
        fontWeight:'bold',
        color:'#000',
        fontSize:16,
        textAlign:'center',
    }
})
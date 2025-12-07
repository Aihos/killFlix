import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PlusSvg from './svg/plus'

const BtnFavory = () => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => console.log('Search pressed')}>
              {/* <Image source={"https://i.pinimg.com/736x/b4/f9/ef/b4f9ef87c592af0145044285cdc1f706.jpg"} style={{width:30, height:30}} /> */}
              <PlusSvg />
           </TouchableOpacity>
  )
}

export default BtnFavory

const styles = StyleSheet.create({

     btn : {
        backgroundColor:'#ffffff88',
        padding:8,
        borderRadius:10,
        backdropFilter:'blur(40px)',
        height:"100%",
        justifyContent:'center',
        alignItems:'center',
    }
})
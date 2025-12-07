import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Image } from 'expo-image';
import { ScrollView } from 'react-native-gesture-handler';

export interface Plat{
    id:number;
    titrePlat:string;
    descPlat:string;
    imgPlat:{
        url:string;
    }
}

const GET_PLATS = gql`
query GetPlats {
    plats{
        id
        titrePlat
        descPlat
        imgPlat{
        url
        }
    }}`

const PLats = () => {
   const {loading, error, data} =  useQuery(GET_PLATS);

   if(loading) {

    return(
        <Text>Loading...</Text>
    )
   } 
   if (error) {
    return (
        <Text>Error: {error.message}</Text>
    )
   }
   console.log(data);
 const plats: Plat[] = data?.plats || [];

  return (

    <ScrollView>
      <Text>PLats</Text>
      <FlatList
       data={plats}
       keyExtractor={(item) => item.id.toString() }
renderItem={({item}) => (
  <View>
<Text style={styles.text}> {item?.titrePlat}</Text>
<Text style={styles.text}> {item?.descPlat}</Text>
<Image
  source={{ uri: item?.imgPlat?.url }}
  style={{ width: 200, height: 200 }}
/>
  </View>
)}/>
    </ScrollView>
  )
}

export default PLats

const styles = StyleSheet.create({

  text:{
    fontSize:20,
    color:'white',
  }
})
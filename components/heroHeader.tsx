import { Image } from 'expo-image';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import PLats from '@/components/PLats';
import {LinearGradient} from 'expo-linear-gradient';
import ButtonWach from './ButtonWach';
import BtnFavory from './BtnFavory';


export default function HeroHeader({titre, url, id}: {titre: string, url: string, id: number}) {
  return (
  <View style={styles.containter}>
    <ImageBackground
        /* source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80' }} */
        source={{ uri: url }}
        style={styles.image}
        >
            <LinearGradient
    colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0.9)']}
    style={styles.gradient}
    />
  <Text style={styles.textTitreHeroBanner}>{titre}</Text> 

        </ImageBackground>
        {/* <Image source={"https://media.pathe.fr/home/featuring/logo/252724/lg/1/logo.png"} 
        style={{width:200, height:100, position:'absolute', 
        bottom:200, 
                    left:'50%',
                    transform: [{translateX: -100}]}} /> */}
                    <View style={styles.btnBottom}>
                               <ButtonWach id={id} /> 
                               <BtnFavory />
                    </View>
    
 
    
    </View>
  );
}

const styles = StyleSheet.create({
    containter:{
        height: 600,
        width: '100%',
    },
    image: {
        flex: 1,
    },
    gradient:{
        height: '100%',
        width: '100%',
        flex:1,
    },
    btnBottom : {
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5,
        position:'absolute',
        bottom:40,
    },
    textTitreHeroBanner:{
        color:'#fff',
        fontSize: 32,
        fontWeight:'bold',
        position:'absolute',
        textAlign:'center', 
        bottom:200,
        width:'100%',
        textTransform:'uppercase',
        paddingHorizontal:10,
    }
    
});

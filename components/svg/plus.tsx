import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg';
import React from 'react'

const PlusSvg = () => {
  return (
    <View>
    <Svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" width={24} height={24}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </Svg>

    </View>
  )
}

export default PlusSvg

const styles = StyleSheet.create({})
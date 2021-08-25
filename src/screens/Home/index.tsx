import React from 'react'
import { StatusBar } from 'react-native'
import { View } from 'react-native'

import { styles } from './styles'


export function Home() {


  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />


    </View>
  )
}
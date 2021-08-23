import React, { useEffect } from 'react'
import { BackHandler, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import { Image, Text, View } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, RectButton } from 'react-native-gesture-handler'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'
import { Alert } from 'react-native'
import { TouchableOpacityBase } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const { navigate } = useNavigation()

  const height = Dimensions.get('window').height - styles.userContainer.paddingTop - styles.userContainer.height - getStatusBarHeight()
  const width = Dimensions.get('window').width - 64

  const positionX = useSharedValue(150)
  const positionY = useSharedValue(270)


  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { positionX: number; positionY: number }
  >({
    onStart: (event, ctx) => {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive: (event, ctx: any) => {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd: (event, ctx: any) => {
      // Trespassing right side
      if (positionX.value >= width - positionX.value) {
        positionX.value = withSpring(width - positionX.value)
      }
      // Trespassing left side
      if (positionX.value <= (width + positionX.value) * -1) {
        positionX.value = withSpring((width + positionX.value) * -1)
      }
      // Trespassing bottom
      if (positionY.value >= (height / 10)) {
        positionY.value = withSpring(positionY.value - height / 10)
      }
      // Trespassing top
      if (positionY.value <= (height / 10) * -1) {
        positionY.value = withSpring((height / 5 - positionY.value))
      }
    }
  })


  const buttonStyle = useAnimatedStyle(() => {
    return {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#7159c1',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  function navigateToRegister() {
    Alert.alert('Ta funfando')
    navigate('Register')
  }

  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.userContainer}>
        <View>
          <Image style={styles.userAvatar} source={{ uri: "https://www.github.com/felipekafuri.png" }} />
        </View>
        <Text style={styles.greetings}>Olá, Felipe Kafuri</Text>
      </View>

      <View style={styles.content}>

        <PanGestureHandler onGestureEvent={onGestureEvent}>
              
          <Animated.View style={buttonStyle} >
            <AnimatedRectButton
              onPress={navigateToRegister}
            >
              <Feather name="plus" color="#ffff" size={30} />
            </AnimatedRectButton>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}
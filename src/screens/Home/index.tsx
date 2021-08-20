import React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import { Image, Text, View } from 'react-native'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, {  useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const windowWidthLimit = Dimensions.get('window').width - styles.button.width
  const windowHeightLimit = Dimensions.get('window').height - styles.button.height
  const bottomSpace = getBottomSpace()
  const topSpace = getStatusBarHeight() - styles.userContainer.paddingTop - styles.userContainer.height

  const positionX = useSharedValue(150)
  const positionY = useSharedValue(270)

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive: (event, ctx: any) => {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd: (event, ctx: any) => {
      // Trespassing right side
      if (positionX.value >= windowWidthLimit - positionX.value) {
        positionX.value = withSpring(windowWidthLimit - positionX.value)
      }
      // Trespassing left side
      if (positionX.value <= (windowWidthLimit + positionX.value) * -1) {
        positionX.value = withSpring((windowWidthLimit + positionX.value) * -1)
      }
      // Trespassing bottom
      if (positionY.value >= (windowHeightLimit / 2) - bottomSpace - positionY.value) {
        positionY.value = withSpring(positionY.value - bottomSpace)
      }
      // Trespassing top
      if (positionY.value <= (windowHeightLimit + topSpace + positionY.value) * -1) {
        positionY.value = withSpring((windowHeightLimit + topSpace + positionY.value) * -1)
      }
    }
  })
  return (
    <View style={styles.container}>
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
          <Animated.View style={[
              buttonStyle
            ]}
          >
            <AnimatedRectButton
              style={[styles.button]}
              onPress={() => {}}
            >
              <Feather name="plus" color="#ffff" size={30}/>
            </AnimatedRectButton>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}
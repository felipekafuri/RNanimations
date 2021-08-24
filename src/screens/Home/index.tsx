import React, { useState } from 'react'
import { Dimensions, StatusBar } from 'react-native'
import { Image, Text, View } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent, RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const [todos, setTodos] = useState<string[]>([])

  const { navigate } = useNavigation()
  const height = Dimensions.get('screen').height
  const width = Dimensions.get('window').width - 64
  const bottomSpace = getBottomSpace()
  const statusBarHeight = getStatusBarHeight()

  const positionX = useSharedValue(150)
  const positionY = useSharedValue(270)
  const scrollY = useSharedValue(0)

  const buttonStyle = useAnimatedStyle(() => {
    return {
      width: 64,
      height: 64,
      zIndex: 99999,
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
      if (event.translationY + ctx.positionY >= height - bottomSpace - 64) {
        positionY.value = withSpring(positionY.value - bottomSpace - 64)
      }
      // Trespassing top
      if (event.translationY + ctx.positionY <= -(statusBarHeight - 200) ) {
        positionY.value = withSpring(-(statusBarHeight - styles.userContainer.height - 64))
      }
    }
  })




  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, styles.userContainer.height / 2],
        [styles.userContainer.height, 0],
        Extrapolate.CLAMP
      )
    }
  })


  function navigateToRegister() {
    navigate('Register')
  }

  const listTodos = useCallback(async () => {
    const response = await AsyncStorage.getItem('@rnanimation')

    if (response) {
      setTodos(JSON.parse(response))
    }
  }, [])

  useFocusEffect(() => {
    listTodos()
  })

  async function handleDeleteTodo(todo: string){
    const findIndex = todos.findIndex(todo => todo === todo)
    todos.splice(findIndex, 1)
    await AsyncStorage.setItem('@rnanimation', JSON.stringify(todos))
  }

  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[styles.userContainer, headerStyle]}>
        <View>
          <Image style={styles.userAvatar} source={{ uri: "https://www.github.com/felipekafuri.png" }} />
        </View>
        <Text style={styles.greetings}>Olá, Felipe Kafuri</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center', paddingTop: 200 }}
      >

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[buttonStyle, { position: 'absolute', zIndex: 999 }]} >
            <AnimatedRectButton
              onPress={navigateToRegister}
            >
              <Feather name="plus" color="#ffff" size={30} />
            </AnimatedRectButton>
          </Animated.View>
        </PanGestureHandler>

        {todos.map((todo, index) => (
          <TouchableWithoutFeedback  
            style={styles.todoCard} 
            key={index}
            onLongPress={()=>handleDeleteTodo(todo)}
          >
            <Text style={styles.todoName}>{todo}</Text>
          </TouchableWithoutFeedback>
        ))}



      </Animated.ScrollView>

    </View>
  )
}
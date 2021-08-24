
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StatusBar, TextInput, Alert } from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { TouchableWithoutFeedbackBase } from 'react-native'
import { Feather } from '@expo/vector-icons'

export function Register() {
  const [todo, setTodo] = useState('')
  const { navigate } = useNavigation()

  async function handleCreateTodo() {
    try {
      if (todo === ''){
        Alert.alert('Dê um nome ao seu todo')
        return
      }
  
      const response = await AsyncStorage.getItem('@rnanimation')
      const todos: string[] = []
  
      if (response) {
        todos.push(...JSON.parse(response))
        todos.push(todo)
        await AsyncStorage.setItem('@rnanimation', JSON.stringify(todos))
        Alert.alert('Sucesso')
      }else{
        todos.push(todo)
        await AsyncStorage.setItem('@rnanimation', JSON.stringify(todos))
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() =>navigate('Home')}>
          <Feather name="chevron-left" size={24} color="#fff"/>
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>
          Adicionar ToDo
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput style={styles.input} autoCorrect={false} placeholder="Todo" onChangeText={setTodo} />
        <RectButton style={styles.button} onPress={handleCreateTodo}>
          <Text style={styles.buttonText}>
            Adicionar
          </Text>
        </RectButton>
      </View>
    </View>
  )
}
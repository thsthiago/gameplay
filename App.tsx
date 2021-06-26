import React from 'react'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'

import { LogBox, StatusBar } from 'react-native'
import { Router } from './src/routes'
import { Background } from './src/components/Background'
import { Provider } from 'react-redux'
import store from './src/store'

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Provider store={store}>
        <Router />
      </Provider>
    </Background>
  )
}

export default App
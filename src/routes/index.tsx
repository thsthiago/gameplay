import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { useSelector } from 'react-redux'
import { SignIn, stateProps } from '../screens/SignIn'

export const Router = () => {
  const { user } = useSelector((state: stateProps) => state.auth)
  
  return user.id !== "" ? (
    <NavigationContainer>
      <AppRoutes /> 
    </NavigationContainer>
  ) : <SignIn />
}
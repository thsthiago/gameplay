import React from "react";

import { View, Text, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { stateProps } from "../../screens/SignIn";
import { signOut } from "../../store/modules/auth/actions";
import { Avatar } from "../Avatar";

import { styles } from './styles'

export const Profile = () => {
  const { user } = useSelector((state: stateProps) => state.auth)
  const dispath = useDispatch()

  function handleSignOut () {
    Alert.alert(
      'Logout', 
      'Deseja sair do GamePlay', 
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            dispath(signOut())
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar}/>
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            {user.firstname}
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>

    </View>
  )
}
import React from "react";

import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { stateProps } from "../../screens/SignIn";
import { Avatar } from "../Avatar";

import { styles } from './styles'

export const Profile = () => {
  const { user } = useSelector((state: stateProps) => state.auth)
  console.log(user)

  return (
    <View style={styles.container}>
      <Avatar urlImage={user.avatar}/>

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
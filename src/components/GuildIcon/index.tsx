import React from "react"

import { Image } from "react-native"

import { styles } from './styles'

export const GuildIcon = () => {
  const uri = 'https://img.icons8.com/color/452/discord-logo--v1.png'

  return (
    <Image 
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  )
}
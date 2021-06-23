import React from "react";

import { styles } from './styles'
import { TextInput, TextInputProps } from 'react-native'


export const SmallInput = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput 
      style={styles.container} 
      keyboardType="numeric"
      {...rest}      
    />
  )
}
import React from "react";

import { styles } from './styles'
import { TextInput, TextInputProps } from 'react-native'


export const TextArea = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput 
      style={styles.container} 
      {...rest}      
    />
  )
}
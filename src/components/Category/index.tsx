import React from "react"
import { SvgProps } from 'react-native-svg'
import { RectButton ,RectButtonProps } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"

import { styles } from "./styles"
import { theme } from "../../global/styles/theme"
import { View, Text } from 'react-native'

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
}

export const Category = ({
  title,
  icon: Icon,
  checked = false,
  ...rest
}: Props) => {
  const {secondary50, secondary70} = theme.colors

  return (
    <RectButton {...rest}>
      <LinearGradient 
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <View style={[styles.content, { opacity: checked ? 1 : 0.4}]}>
          <View style={checked ? styles.checked : styles.check}></View>
            <Icon width={48} height={48}></Icon>

          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </RectButton>
  )
}
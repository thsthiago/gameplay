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
  hasCheckBox?: boolean;
  checked?: boolean;
}

export const Category = ({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: Props) => {
  const { secondary40, secondary50, secondary70, secondary85 } = theme.colors

  return (
    <RectButton {...rest}>
      <LinearGradient 
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <LinearGradient 
          style={[styles.content, { opacity: checked ? 1 : 0.4}]}
          colors={[checked ? secondary85 : secondary50, secondary40]}
        >
          {
            hasCheckBox &&
            <View style={checked ? styles.checked : styles.check}></View>
          }
          
            <Icon width={48} height={48}></Icon>

          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  )
}
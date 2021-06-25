import { StyleSheet } from "react-native"; 
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26
  },
  matches: {
    marginTop: 24,
    marginLeft: 24,
  }
})
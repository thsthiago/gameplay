import React from 'react'
import { 
  View, 
  Text, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import { Background } from '../../components/Background'
import IllustrationImg from '../../assets/illustration.png'
import { styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, User } from '../../store/modules/auth/reducers'
import { authUser, isLoading } from '../../store/modules/auth/actions'
import { theme } from '../../global/styles/theme'

export type stateProps = {
  auth: {
    user: User,
    loading: boolean
  }
}

export const SignIn = () => {
  const { loading } = useSelector((state: stateProps) => state.auth)
  const dispath = useDispatch()

  async function handleSignIn () {
    try {
      const user = await signIn()
      dispath(authUser(user))
    } catch (err) {
      Alert.alert(err)
    }
  }

  function handleLoading() {
    handleSignIn()
    dispath(isLoading())
  }

  return (
    <Background>
      <View style={styles.container} >
        <Image 
          source={IllustrationImg} 
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {
            loading 
            ? <ActivityIndicator color={theme.colors.primary}/> 
            : <ButtonIcon title="Entrar com Discord" onPress={handleLoading}/>
          }
        </View>
      </View>
    </Background>
  )
}
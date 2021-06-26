import { AUTENTICACAO, LOADING } from '../types'
import * as AuthSession from 'expo-auth-session'
import { 
  SCOPE,
  CLIENT_ID,
  CDN_IMAGE,
  REDIRECT_URI,
  RESPONSE_TYPE
} from '../../../configs'
import { api } from '../../../services/api'

export type User = {
  id: string;
  username: string;
  firstname: string;
  avatar: string;
  email: string;
  token: string;
}

export type AuthContextData = {
  user: User;
  loading: boolean;
}

const initialState = {
  user: {
    id: '',
    username: '',
    firstname: '',
    avatar: '',
    email: '',
    token: ''
  },
  loading: false
}

type actionProps = {
  type: string;
  user: User;
  loading: boolean;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export async function signIn(): Promise<User | undefined>{
  try {
    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
    
    if(type === 'success' && !params.error) {
      api.defaults.headers.authorization = `Bearer ${params.access_token}` 

      const userInfo = await api.get('./users/@me')

      const firstname = userInfo.data.username.split(' ')[0]

      userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
      let user = {
        ...userInfo.data,
        firstname,
        tokem: params.access_token
      } as User

      return user
    } 
  } catch (err) {
    throw new Error('Não foi possivel autenticar')
  } finally {
    return initialState.user
  }
}

export default function auth(state: AuthContextData = initialState, action: actionProps) {
  switch (action.type) {
    case AUTENTICACAO: 
      const { user } = action
      return { user, loading: false }
    case LOADING: 
      state.loading = true
    
      return {
        ...state
      }

    default:
      return state
  }
}
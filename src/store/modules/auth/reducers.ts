import { AUTENTICACAO } from "../types"

export type User = {
  id: string;
  username: string;
  firstname: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
}

const initialState = {
  user: {
    id: '',
    username: '',
    firstname: '',
    avatar: '',
    email: '',
    token: ''
  }
}

type actionProps = {
  type: string
  user: AuthContextData
}

export default function auth(state: AuthContextData = initialState, action: actionProps) {
  switch (action.type) {
    case AUTENTICACAO: 
      const { user } = action
      return {
        user
      }

    default:
      return {
        ...state
      }
  }
}
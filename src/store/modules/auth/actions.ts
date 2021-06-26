import { AUTENTICACAO, LOADING } from "../types";
import { User } from "./reducers";

export function authUser (user: User | undefined ) {
  return {
    type: AUTENTICACAO,
    user
  }
}

export function isLoading () {
  return {
    type: LOADING
  }
}
import useLocalStorage from '@rehooks/local-storage'
import React, { createContext, ReactNode, useContext } from 'react'

export const securityTokensLocalStorageKey = 'securityTokens'
export const userLocalStorageKey = 'user'
export const loginLocalStorageKey = 'login'

export interface ISecurityTokens {
  accessToken?: string
  refreshToken?: string
}

export interface IRol {
  name: string
}

export interface IUserPerfil {
  id: string
  username: string
  rol?: IRol
  fullname: string
  email: string
  imagePerfil: string
}

const initialSecurityTokens: ISecurityTokens = { accessToken: '', refreshToken: '' }
const initialUser: IUserPerfil = {
  id: '',
  username: '',
  fullname: '',
  email: '',
  imagePerfil: '',
}

interface IAuthProviderProps {
  children?: ReactNode
}

interface IAuthContextProps {
  securityTokens: ISecurityTokens
  setSecurityTokens(securityTokens: ISecurityTokens): void
  isAuthenticated: boolean
  setIsAuthenticated(isAuthenticated: boolean): void
  user: IUserPerfil
  setUser(user: IUserPerfil): void
}

export const AuthContext = createContext<IAuthContextProps>({
  securityTokens: initialSecurityTokens,
  // eslint-disable-next-line no-empty,no-empty-function,@typescript-eslint/no-empty-function
  setSecurityTokens: () => {},
  isAuthenticated: false,
  // eslint-disable-next-line no-empty,no-empty-function,@typescript-eslint/no-empty-function
  setIsAuthenticated: () => {},
  user: initialUser,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
})

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [securityTokens, setSecurityTokens] = useLocalStorage(
    securityTokensLocalStorageKey,
    initialSecurityTokens
  )
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(loginLocalStorageKey, false)
  const [user, setUser] = useLocalStorage(userLocalStorageKey, initialUser)

  const setIsAuthenticatedCustom = (value: boolean) => {
    setIsAuthenticated(value)
  }

  const ctxValue: IAuthContextProps = {
    securityTokens,
    setSecurityTokens,
    isAuthenticated,
    setIsAuthenticated: setIsAuthenticatedCustom,
    user: user,
    setUser: setUser,
  }

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}

export const useAuthSecurity = () => useContext(AuthContext)

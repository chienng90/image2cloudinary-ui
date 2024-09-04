'use client'
import useGetUserProfile, { GetUserProfileReturnHooks } from '@/hooks/useGetUserProfile'
import useAuthentication, { LoginForm, LoginReturnHooks } from '@/hooks/useAuth'
import React, { createContext, useContext } from 'react'

type ContextProps = LoginReturnHooks

const AuthenticationContext = createContext<ContextProps>({
  token: '',
  login: () => new Promise(() => {}),
  register: () => new Promise(() => {})
})

interface Props {
  children: React.ReactNode
}

export const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const loginHooks = useAuthentication()

  return (
    <AuthenticationContext.Provider
      value={{
        ...loginHooks,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthenticationContext = (): ContextProps => useContext(AuthenticationContext)

'use client'
import useGetUserProfile, { GetUserProfileReturnHooks } from '@/hooks/useGetUserProfile'
import React, { createContext, useContext } from 'react'

type ContextProps = GetUserProfileReturnHooks

const ProfileContext = createContext<ContextProps>({
  isLoadingProfile: false,
  profile: null,
  getProfile: () => new Promise(() => {})
})

interface Props {
  children: React.ReactNode
}

export const ProfileProvider: React.FC<Props> = ({ children }) => {
  const getProfileHooks = useGetUserProfile()

  return (
    <ProfileContext.Provider
      value={{
        ...getProfileHooks,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = (): ContextProps => useContext(ProfileContext)

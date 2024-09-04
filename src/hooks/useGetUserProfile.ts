import { handleGetProfile } from "@/api/user/actions"
import { useState } from "react"

export interface GetUserProfileReturnHooks {
  isLoadingProfile: boolean
  profile: Record<string, string> | null
  getProfile: () => Promise<void>
}

const useGetUserProfile = (): GetUserProfileReturnHooks => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  const getProfile = async () => {
    setLoading(true)
    const data = await handleGetProfile()
    if (data.content) {
      setProfile(data.content)
    }
    setLoading(false)
  }

  return {
    isLoadingProfile: loading,
    profile,
    getProfile
  }
}

export default useGetUserProfile

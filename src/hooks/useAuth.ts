import { handleLogin, handleRegister } from "@/api/auth/actions"
import { SignUpForm } from "@/containers/SignUp/SignUp"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie";

export interface LoginReturnHooks {
  token: string
  login: (payload: LoginForm) => Promise<void>
  register: (payload: SignUpForm) => Promise<void>
}

export interface LoginForm {
  email: string
  password: string
}

const useAuthentication = (): LoginReturnHooks => {
  const defaultToken = Cookies.get('jwt')
  const [token, setToken] = useState(defaultToken || '')
  const router = useRouter()

  const login = async (payload: LoginForm) => {
    const data = await handleLogin(payload)
    setToken(data)
    if (data) {
      router.push('/')
    }
  }

  const register = async (payload: SignUpForm) => {
    const data = await handleRegister(payload)
    setToken(data)
    if (data?.id) {
      router.push('/login')
    }
  }

  return {
    token,
    login,
    register,
  }
}

export default useAuthentication

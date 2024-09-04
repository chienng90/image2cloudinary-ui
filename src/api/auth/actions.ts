'use server'

import { LoginForm } from "@/hooks/useAuth";
import { loginService, registerService } from "./serverActions";
import { cookies } from "next/headers";
import { DEFAULT_COOKIE_CONFIG } from "@/storage/cookie";
import { SignUpForm } from "@/containers/SignUp/SignUp";

export const handleLogin = async (payload: LoginForm) => {
  const data = await loginService(payload)
  cookies().set("jwt", data.content.token, DEFAULT_COOKIE_CONFIG);
  return data?.content?.token || ''
}

export const handleRegister = async (payload: SignUpForm) => {
  const data = await registerService(payload)
  return data?.content || ''
}
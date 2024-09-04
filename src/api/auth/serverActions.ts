"use server";

import { SignUpForm } from "@/containers/SignUp/SignUp";
import { LoginForm } from "@/hooks/useAuth";

export async function registerService(payload: SignUpForm) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function loginService(userData: LoginForm) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
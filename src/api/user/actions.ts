'use client'

import { getToken } from "@/helpers/tokenClient";

export const handleGetProfile = async () => {
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
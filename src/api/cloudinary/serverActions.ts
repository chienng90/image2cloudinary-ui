"use server";

import { getAuthToken } from "@/helpers/token";

export async function generateSignatureService() {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-signature`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImageWithSignatureService(signature: string, timestamp: number, formData: FormData) {
  try {
    const response = await fetch(`${process.env.CLOUDINARY_API_URL}/${process.env.CLOUD_NAME}/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`, {
      method: "POST",
      body: formData,
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
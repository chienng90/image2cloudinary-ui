'use server'

import { handleApiError } from "@/helpers/handleApiError";
import { generateSignatureService, uploadImageWithSignatureService } from "./serverActions";

export const handleGenerateSignature = async () => {
  const data = await generateSignatureService()
  handleApiError(data.statusCode)
  return data
}

export const handleUploadImageWithSignature = async (signature: string, timestamp: number, formData: FormData) => {
  const data = await uploadImageWithSignatureService(signature, timestamp, formData)
  return data
}
'use server'

import { handleApiError } from "@/helpers/handleApiError";
import { bookmarkService, getBookmarkService } from "./serverActions";

export const handleBookMark = async (id: number) => {
  const data = await bookmarkService(id)
  handleApiError(data.statusCode)
  return data?.content || ''
}

export const handleGetBookmark = async (id: number) => {
  const data = await getBookmarkService(id)
  handleApiError(data.statusCode)
  return data?.content || ''
}
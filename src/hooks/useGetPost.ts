import { handleGetBookmark } from "@/api/bookmark/actions"
import { handleGetPost } from "@/api/post/actions"
import { useState } from "react"

export interface GetPostReturnHooks {
  isLoadingPost: boolean
  post: any
  isBookmarked: boolean
  getPost: (page: number) => Promise<void>
}

const useGetPost = (): GetPostReturnHooks => {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getPost = async (id: number) => {
    setLoading(true)
    const data = await handleGetPost(id)
    if (data?.content) {
      setPost(data?.content || null)
      const checkBookmark = await handleGetBookmark(id)
      setIsBookmarked(!!checkBookmark?.image_id)
    }
    setLoading(false)
  }

  return {
    isLoadingPost: loading,
    post,
    getPost,
    isBookmarked,
  }
}

export default useGetPost

import { handleGetPosts } from "@/api/post/actions"
import { handleGetProfile } from "@/api/user/actions"
import Router from "next/router"
import { useState } from "react"

export interface GetPostsReturnHooks {
  isLoadingPosts: boolean
  posts: any[]
  getPosts: (page?: number) => Promise<void>
  page: {
    currentPage: number,
    pages: number,
  }
}

const useGetPosts = (): GetPostsReturnHooks => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({
    currentPage: 1,
    pages: 0,
  })

  const getPosts = async (page?: number) => {
    setLoading(true)
    const newPage = page || 1
    const data = await handleGetPosts(page || 1)
    if (data) {
      const newData = newPage === 1 ? [...data.data] : [...posts, ...data.data]
      setPosts(newData)
      setPage(data.pagination)
    }
    setLoading(false)
  }

  return {
    isLoadingPosts: loading,
    posts,
    page,
    getPosts
  }
}

export default useGetPosts

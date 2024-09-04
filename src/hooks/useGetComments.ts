import { handleGetComments } from "@/api/comments/actions"
import { handleGetPosts } from "@/api/post/actions"
import { handleGetProfile } from "@/api/user/actions"
import Router from "next/router"
import { useState } from "react"

export interface GetPostsReturnHooks {
  isLoadingComments: boolean
  comments: any[]
  getComments: (id: number, page?: number) => Promise<void>
  page: {
    currentPage: number,
    pages: number,
  }
}

const useGetComments = (): GetPostsReturnHooks => {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({
    currentPage: 1,
    pages: 0,
  })

  const getComments = async (id: number, page?: number) => {
    setLoading(true)
    const newPage = page || 1
    const data = await handleGetComments(id, newPage)
    if (data) {
      const newData = newPage === 1 ? [...data.data] : [...comments, ...data.data]
      setComments(newData)
      setPage(data.pagination)
    }
    setLoading(false)
  }

  return {
    isLoadingComments: loading,
    comments,
    page,
    getComments
  }
}

export default useGetComments

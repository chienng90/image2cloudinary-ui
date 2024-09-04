
import { CommentForm } from "@/containers/Home/components/PostDetailModal/PostDetailModal";
import { getToken } from "@/helpers/tokenClient";

export const handleGetComments = async ({ pageParam = 1, id = '' }) => {
  if (!id) return
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}/comments?currentPage=${pageParam}&itemPerPage=10`, {
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

export const handleComment = async (id: number, payload: CommentForm) => {
  if (!id) return
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
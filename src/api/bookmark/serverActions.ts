"use server";

import { CommentForm } from "@/containers/Home/components/PostDetailModal/PostDetailModal";
import { getAuthToken } from "@/helpers/token";

export async function bookmarkService(id: number) {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({  }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getBookmarkService(id: number) {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks/${id}`, {
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
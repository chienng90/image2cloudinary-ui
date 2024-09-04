'use client'

import { CreatePostPayload } from "@/components/CreatePostModal/CreatePostModal";
import { getToken } from "@/helpers/tokenClient";

export const handleGetPosts = async ({ pageParam = 1, freeText = '' }) => {
  try {
    const token = getToken()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images?currentPage=${pageParam}&itemPerPage=10&freeText=${freeText}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const handleGetPost = async (id: number) => {
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
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

export const handleCreatePost = async (payload: CreatePostPayload) => {
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...payload,
      }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
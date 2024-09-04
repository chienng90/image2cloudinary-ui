"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { useRouter, useSearchParams } from "next/navigation";
import Post from "../Home/components/Post";
import UserSuggestions from "../Home/components/UserSuggestions";
import { handleGetPosts } from "@/api/post/actions";

const Search = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger only once when the element comes into view
    threshold: 1, // Trigger when 50% of the element is visible
  });

  const containerRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [searchText, setSearchText] = useState("");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["images", query],
    queryFn: ({ pageParam, queryKey }) => {
      return handleGetPosts({ pageParam, freeText: queryKey[1] || '' })
    },
    initialPageParam: 1,
    refetchOnMount: "always",
    getPreviousPageParam: (firstPage) => {
      return firstPage.content.pagination?.currentPage > 1
        ? firstPage.content.pagination?.currentPage - 1
        : null;
    },
    getNextPageParam: (firstPage) => {
      return firstPage.content.pagination?.currentPage <
        firstPage.content.pagination?.pages
        ? firstPage.content.pagination?.currentPage + 1
        : null;
    },
  });

  const memoizedItems = useMemo(() => {
    return data?.pages?.map((page) => (
      <Fragment key={page.nextId}>
        {page.content.data?.length ? (
          page.content.data?.map(
            (post: any, index: React.Key | null | undefined) => (
              <Post key={index} data={post} />
            )
          )
        ) : (
          <p className="font-semibold text-lg text-center">No data available</p>
        )}
      </Fragment>
    ));
  }, [data?.pages]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (!searchText) {
      setSearchText(query || "");
    }
  }, []);

  return (
    <div
      className="h-[100vh] w-full overflow-y-auto bg-[#fafafa] text-[#262626]"
      ref={containerRef}
    >
      <div className="mx-auto flex max-w-[822px] justify-center pb-16 lg:justify-start gap-x-4">
        <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[470px] flex-grow m-[auto] my-0">
          <div className="max-w-md mx-auto my-4 flex gap-2">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.currentTarget.value || "");
              }}
              type="search"
              id="default-search"
              className="outline-none block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-black"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="button"
              onClick={() => {
                router.push(`/search?q=${searchText}`);
              }}
              className="text-white end-2.5 bottom-2.5 bg-black/70 hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-2 py-2"
            >
              Search
            </button>
          </div>
          {memoizedItems}
      {hasNextPage && <div ref={ref} className="h-[20px]"></div>}

        </div>
        <div className="hidden md:block">
          <UserSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Search;

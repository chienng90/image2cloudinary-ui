"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Post from "./components/Post";
import UserSuggestions from "./components/UserSuggestions";
import { handleGetPosts } from "@/api/post/actions";

const Home = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger only once when the element comes into view
    threshold: 1, // Trigger when 50% of the element is visible
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: handleGetPosts,
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
    return data?.pages?.map((page, index) => (
      <Fragment key={`${page.nextId} + ${index}`}>
        {page.content.data?.map(
          (post: any, index: React.Key | null | undefined) => (
            <Post key={`${post.id} + ${index}`} data={post} />
          )
        )}
      </Fragment>
    ));
  }, [data?.pages]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div
      className="h-[100vh] w-full overflow-y-auto bg-[#fafafa] text-[#262626]"
    >
      <div className="mx-auto flex max-w-[822px] justify-center pb-16 lg:justify-start gap-x-4">
        <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[470px] flex-grow m-[auto] my-0">
          {memoizedItems}
          {hasNextPage && <div ref={ref} className="h-[20px]"></div>}
        </div>
        <UserSuggestions />
      </div>
    </div>
  );
};

export default React.memo(Home);

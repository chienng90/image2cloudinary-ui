import CloseIcon from "@/components/Icons/CloseIcon";
import Image from "next/image";
import ThreeDotIcon from "@/components/Icons/ThreeDotIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import ChatIcon from "@/components/Icons/ChatIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import BookMarkIcon from "@/components/Icons/BookMarkIcon";
import { Fragment, useEffect, useMemo, useRef } from "react";
import useGetPost from "@/hooks/useGetPost";
import { handleComment, handleGetComments } from "@/api/comments/actions";
import { handleBookMark } from "@/api/bookmark/actions";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import { DEFAULT_IMAGE_URL } from "@/constants";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  id: number;
  onClose: () => void;
}

export interface CommentForm {
  content: string;
}

const PostDetailModal: React.FC<Props> = ({ id, onClose }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { post, isBookmarked, getPost } = useGetPost();

  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger only once when the element comes into view
    threshold: 1, // Trigger when 50% of the element is visible
  });

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam, queryKey }) => {
      return handleGetComments({ pageParam, id: queryKey[1].toString() || '' })
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

  const handleFocus = () => {
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (!post) {
      getPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSaveComment = () => {
    const newComment = textareaRef.current?.value;
    if (newComment) {
      handleComment(id, {
        content: newComment,
      }).then((res) => {
        refetch();
      });
    }
  };

  const handleBookMarkPost = () => {
    handleBookMark(id).then((res) => {
      getPost(id);
    });
  };

  const renderBookmarkBtn = useMemo(() => {
    return (
      <button
        onClick={handleBookMarkPost}
        type="button"
        className="inline-flex flex-col items-center justify-center hover:bg-gray-50 group"
      >
        <BookMarkIcon fill={isBookmarked ? "black" : "none"} />
      </button>
    );
  }, [isBookmarked]);

  const renderComments = useMemo(() => {
    return data?.pages?.map((page) => (
      <Fragment key={page.nextId}>
        {page.content.data?.map(
          (comment: any, index: React.Key | null | undefined) => {
            return (
              (
                <div className="flex gap-x-2 mb-2 items-center" key={index}>
                  {comment.user?.avatar?.includes("http") ? (
                    <Image
                      className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                      src={comment.user?.avatar}
                      alt="avatar"
                      width="32"
                      height="32"
                    />
                  ) : (
                    <div className="w-8 h-8">
                      <ProfileIcon />
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-semibold pr-1">
                      {comment.user?.fullname}
                    </span>
                    {comment.content}
                  </div>
                </div>
              )
            )
          }
        )}
      </Fragment>
    ));
  }, [data?.pages]);

  if (!post) return null;

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="bg-neutral-950/70 overflow-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-[100vh]"
    >
      <div className="flex justify-end p-5">
        <button type="button" onClick={() => onClose()}>
          <CloseIcon />
        </button>
      </div>
      <div className="relative p-4 w-full max-w-[400px] md:max-w-[calc(100vw-2rem)] max-h-[80vh] h-full m-auto">
        <div className="relative bg-white flex w-full flex-col md:flex-row max-w-[1000px] m-auto h-[inherit]">
          <div className="w-full md:w-1/2 h-[inherit]">
            <Image
              src={post.path.includes("http") ? post.path : DEFAULT_IMAGE_URL}
              height={500}
              alt=""
              width={500}
              style={{
                height: 'inherit'
              }}
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4 flex flex-col overflow-y-auto">
            <div className="pl-4 md:pl-5 flex justify-between border-b-[1px] border-neutral-300/40 hidden md:flex">
              <div className="gap-x-2 flex items-center py-3 ">
                {post.user?.avatar.includes("http") ? (
                  <Image
                    className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
                    src={post.user?.avatar}
                    alt="avatar"
                    width="32"
                    height="32"
                  />
                ) : (
                  <div className="w-8 h-8">
                    <ProfileIcon />
                  </div>
                )}
                <p className="cursor-pointer inline m-0 font-semibold text-sm">
                  {post.user?.fullname}
                </p>
              </div>
              <button type="button" className="pr-4 md:pr-5">
                <ThreeDotIcon />
              </button>
            </div>
            <div className="pl-4 md:pl-5 flex-1 hidden md:block">
              {renderComments}

              {hasNextPage && <div ref={ref} className="h-[20px]"></div>}
            </div>
            <div>
              <div className="pl-4 md:pl-5 flex items-center my-2 border-t-[1px] border-neutral-300/40 pt-[8px] pb-[6px] pr-6">
                <div className="flex-1 flex gap-x-3 items-center">
                  <button
                    type="button"
                    className="inline-flex flex-col items-center justify-center hover:bg-gray-50 group"
                  >
                    <HeartIcon />
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-col items-center justify-center hover:bg-gray-50 group"
                    onClick={handleFocus}
                  >
                    <ChatIcon />
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-col items-center justify-center hover:bg-gray-50 group"
                  >
                    <MessageIcon />
                  </button>
                </div>
                {renderBookmarkBtn}
              </div>
              <div className="pl-4 md:pl-5 flex border-t-[1px] border-neutral-400/40 py-[6px] pr-6">
                <textarea
                  ref={textareaRef}
                  autoComplete="off"
                  autoCorrect="off"
                  className="flex-1 outline-none text-black text-sm resize-none"
                  aria-label="Add a comment…"
                  placeholder="Add a comment…"
                />
                <button
                  type="button"
                  className="text-sm font-semibold text-[#1877F2]"
                  onClick={handleSaveComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;

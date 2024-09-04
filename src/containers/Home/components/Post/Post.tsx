import BookMarkIcon from "@/components/Icons/BookMarkIcon";
import ChatIcon from "@/components/Icons/ChatIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import Image from "next/image";
import React, { useState } from "react";
import PostDetailModal from "../PostDetailModal";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import { DEFAULT_IMAGE_URL } from "@/constants";

interface Props {
  data: any;
}

const Post: React.FC<Props> = ({ data }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="border-b-[1px] border-neutral-300/40 pb-4">
      <div className="ml-3 gap-x-2 flex items-center py-3 ">
        {data.user?.avatar.includes("http") ? (
          <Image
            className="h-8 w-8 cursor-pointer select-none rounded-full object-cover"
            src={data.user?.avatar}
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
          {data.user?.fullname}
        </p>
      </div>
      <Image
        src={data.path.includes('http') ? data.path : DEFAULT_IMAGE_URL}
        width={500}
        height={500}
        alt=""
        className="border-[1px] border-neutral-300/40 rounded-md"
      />
      <div className="flex items-center my-2">
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
            onClick={() => setShowDetail(!showDetail)}
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
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center hover:bg-gray-50 group"
        >
          <BookMarkIcon />
        </button>
      </div>
      <p className="inline text-sm">{data.desc}</p>
      {showDetail && (
        <PostDetailModal id={data.id} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
};

export default Post

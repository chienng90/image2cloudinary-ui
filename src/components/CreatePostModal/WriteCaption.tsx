// import required modules
import Image from "next/image";
import { useProfileContext } from "../Providers/ProfileContext/ProfileContext";
import ProfileIcon from "../Icons/ProfileIcon";
import { forwardRef, RefObject } from "react";

interface Props {
  previewImage: string;
}

const WriteCaption = forwardRef<HTMLTextAreaElement, Props>(({ previewImage }, ref)  => {
  const { profile } = useProfileContext();

  return (
    <div className="relative bg-white flex w-full flex-col md:flex-row rounded-b-[12px] h-[60vh]">
      <div className="w-full md:w-1/2">
        <Image
          src={previewImage}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            height: "60vh",
            width: "100%",
            objectFit: "cover",
            borderBottomLeftRadius: "12px",
          }}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="pl-2 flex justify-between">
          <div className="gap-x-2 flex items-center py-3 ">
            {profile?.avatar ? (
              <Image
                className="h-[28px] w-[28px] cursor-pointer select-none rounded-full object-cover"
                src={profile.avatar}
                alt="avatar"
                width="28"
                height="28"
              />
            ) : (
              <div className="h-[28px] w-[28px] cursor-pointer select-none rounded-full object-cover">
                <ProfileIcon />
              </div>
            )}
            <p className="cursor-pointer inline m-0 font-semibold text-sm">
              {profile?.fullname || ""}
            </p>
          </div>
        </div>
        <textarea
          ref={ref}
          className="outline-none px-2 mt-0 resize-none flex-1 rounded-br-[12px]"
        />
      </div>
    </div>
  );
})

export default WriteCaption;

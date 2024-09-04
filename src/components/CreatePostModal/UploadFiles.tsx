import CloseIcon from "@/components/Icons/CloseIcon";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { ChangeEvent } from "react";
import PhotosIcon from "../Icons/PhotosIcon";

interface Props {
  previewImage: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadFiles: React.FC<Props> = ({ onChange, previewImage }) => {
  return (
    <div className="flex items-center justify-center w-full flex-1 h-[60vh]">
      {previewImage.length ? (
        <Image
          src={previewImage}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            objectFit: "cover",
            height: "inherit",
            borderRadius: " 0 0 12px 12px",
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[60vh]">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-y-2">
            <PhotosIcon />
            <p className="mb-2 text-lg">Drag photos and videos here</p>
            <label
              htmlFor="dropzone-file"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Select from computer
            </label>
            <input
              id="dropzone-file"
              type="file"
              accept="image/jpeg, image/png, image/gif"
              className="hidden"
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;

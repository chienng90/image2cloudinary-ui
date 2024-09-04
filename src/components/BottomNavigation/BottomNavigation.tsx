import useWindowSize from "@/hooks/useWindowSize";
import HomeIcon from "../Icons/HomeIcon";
import SearchIcon from "../Icons/SearchIcon";
import CreateIcon from "../Icons/CreateIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileIcon from "../Icons/ProfileIcon";
import { useProfileContext } from "../Providers/ProfileContext/ProfileContext";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

interface Props {
  onCreatePost: () => void;
}

const BottomNavigation: React.FC<Props> = ({ onCreatePost }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const width = useWindowSize();
  const router = useRouter();
  const { profile } = useProfileContext();
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    Cookies.remove("jwt", { path: "/" });
    window.location.reload();
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("click", closePopover);
    } else {
      document.removeEventListener("click", closePopover);
    }

    return () => {
      document.removeEventListener("click", closePopover);
    };
  }, [isPopoverOpen]);

  if (width > 768) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <HomeIcon />
        </button>
        <button
          type="button"
          onClick={() => router.push("/search")}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <SearchIcon />
        </button>
        <button
          type="button"
          onClick={() => onCreatePost()}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <CreateIcon />
        </button>
        <button
          type="button"
          onClick={togglePopover}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          {profile?.avatar ? (
            <Image
              className="h-[28px] w-[28px] cursor-pointer select-none rounded-full object-cover"
              src={profile.avatar}
              alt="avatar"
              width="28"
              height="28"
            />
          ) : (
            <ProfileIcon />
          )}
        </button>
        {isPopoverOpen && (
          <div
            ref={popoverRef}
            className={`origin-top-right right-0 absolute bottom-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={() => handleLogout()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNavigation;

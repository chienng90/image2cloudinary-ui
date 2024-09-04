import React, { useState, useRef } from "react";
import { MenuItem, Menu } from "react-pro-sidebar";
import ProfileIcon from "../Icons/ProfileIcon";
import Image from "next/image";
import { useProfileContext } from "../Providers/ProfileContext/ProfileContext";
import Cookies from "js-cookie";

const MenuWithPopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { profile } = useProfileContext();

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

  const handleLogout = () => {
    Cookies.remove("jwt", { path: '/' });
    window.location.reload()
  }

  React.useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("click", closePopover);
    } else {
      document.removeEventListener("click", closePopover);
    }

    return () => {
      document.removeEventListener("click", closePopover);
    };
  }, [isPopoverOpen]);

  return (
    <>
      <Menu>
        <MenuItem
          ref={userMenuRef}
          className=" inline-block text-left"
          onClick={togglePopover}
          data-popover-target="popover-default"
          data-popover-placement="right-end"
          icon={
            profile?.avatar ? (
              <Image
                className="h-[24px] w-[24px] cursor-pointer select-none rounded-full object-cover"
                src={profile.avatar}
                alt="avatar"
                width="24"
                height="24"
              />
            ) : (
              <ProfileIcon />
            )
          }
        >
          {profile?.fullname || ""}
        </MenuItem>
      </Menu>
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className={`origin-top-right left-4 absolute bottom-14 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
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
    </>
  );
};

export default MenuWithPopover;

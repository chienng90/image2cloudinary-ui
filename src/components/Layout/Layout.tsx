"use client";

import { useEffect, useState } from "react";
import { useProfileContext } from "../Providers/ProfileContext/ProfileContext";
import SideBar from "../SideBar";
import BottomNavigation from "../BottomNavigation";
import CreatePostModal from "../CreatePostModal";
import { useAuthenticationContext } from "../Providers/AuthenticationProvider/AuthenticationContext";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const { getProfile, profile } = useProfileContext();
  const {token} = useAuthenticationContext()

  useEffect(() => {
    if (!profile && token) {
      getProfile();
    }
  }, [token]);

  return (
    <>
      <div className="flex h-full relative overflow-y-hidden">
        <SideBar
          onCreatePost={() => setShowCreatePostModal(!showCreatePostModal)}
        />
        {children}
        <BottomNavigation
          onCreatePost={() => setShowCreatePostModal(!showCreatePostModal)}
        />
      </div>
      {showCreatePostModal && (
        <CreatePostModal onClose={() => setShowCreatePostModal(false)} />
      )}
    </>
  );
};

export default Layout;

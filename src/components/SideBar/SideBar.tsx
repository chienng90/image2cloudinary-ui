import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeIcon from "../Icons/HomeIcon";
import SearchIcon from "../Icons/SearchIcon";
import CreateIcon from "../Icons/CreateIcon";
import MessageIcon from "../Icons/MessageIcon";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

interface Props {
  onCreatePost: () => void;
}

const SideBar: React.FC<Props> = ({ onCreatePost }) => {
  const width = useWindowSize();
  const router = useRouter();

  if (width <= 768) return null;

  return (
    <Sidebar
      className="h-[100vh]"
      collapsed={width <= 1024}
      transitionDuration={500}
      rootStyles={{
        borderRightColor: "rgb(219, 219, 219)",
        position: 'unset',
        '.ps-sidebar-container': {
          position: 'unset'
        },
        [`&.ps-active`]: {
          fontWeight: 700,
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h1
            className="text-2xl font-medium text-center py-3.5 cursor-pointer"
            onClick={() => router.push("/")}
          >
            {width <= 1024 ? "SM" : "Social Media"}
          </h1>
          <Menu>
            <MenuItem active icon={<HomeIcon />} href="/">
              Home
            </MenuItem>
            <MenuItem icon={<SearchIcon />} href="/search">
              Search
            </MenuItem>
            <MenuItem icon={<CreateIcon />} onClick={() => onCreatePost()}>
              Create
            </MenuItem>
            <MenuItem icon={<MessageIcon />}>Messages</MenuItem>
          </Menu>
        </div>

        <UserMenu />
      </div>
    </Sidebar>
  );
};

export default SideBar;

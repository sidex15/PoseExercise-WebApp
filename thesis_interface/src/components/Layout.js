import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Layout = ({ children }) => {

  const [open, setOpen] = useState(false);

  const hamburger = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-screen flex sticky top-0 z-1">
        <div className="p-3 bg-cyan-blue h-14 w-52">
          <HiMenu
            size="30px"
            color="white"
            cursor="pointer"
            onClick={hamburger}
          />
        </div>
        <Topbar />
      </div>
      <div className="h-full w-full flex">
        <Sidebar open={open} />
          <div className="h-full w-full relative overflow-hidden flex justify-center items-center bg-#F8F8FF">
            {children}
          </div>
      </div>
    </div>
  );
};

export default Layout;

/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import React, { useEffect, useState } from "react";

import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button } from "../ui/buttons"
// import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown";
// import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

// import { Spinner } from "../../ui/spinner"
// import { SidebarTrigger } from "../ui/sidebar";
import HomeIcon from '@mui/icons-material/Home';
import BorderBottomIcon from '@mui/icons-material/BorderBottom';
import { DialogDemo } from "../user/common/Dialog";
import { useSpaceStore } from "@/lib/store/useSpaceStore";
import SpaceLists from "../user/user-home/SpaceLists";
import AddIcon from '@mui/icons-material/Add';
// import { id } from "date-fns/locale";
type AsidProps = {
  state: "expanded" | "collapsed";
}

const Aside: React.FC<AsidProps> = ({ state }) => {
  const isExpanded = state === "expanded";

  const [animationKey, setAnimationKey] = useState(0);
  // const { logoutUser } = useAuthStore()
  const { findWorkSpaces } = useSpaceStore()
  // const { start, complete } = useLoadingBar();
  useEffect(() => {
    findWorkSpaces()
  }, [])

  // const handleLogout = async () => {
  //   start()

  //   const logout = await logoutUser()
  //   if (logout?.success) {

  //     router.push("/")
  //     complete()


  //   } else {
  //     complete()
  //   }
  // }




  const mainItems = [
    { icon: <HomeIcon className="dark:text-white" />, label: "Home" },
    { icon: <ListAltIcon className="dark:text-white" />, label: "Boards" },
    { icon: <BorderBottomIcon className="dark:text-white" />, label: "Templates" },
  ];




  return (
    <aside className={`w-60 text-black  ${isExpanded ? "p-4" : "p-0"} flex flex-col justify-start`}>

      <div >



        <div className="space-y-2  flex flex-col items-start  pt-5">
          {mainItems.map((item, idx) => (
            <Button key={idx} size={isExpanded ? "lg" : "icon"} rounded="md" className={`w-full   dark: hover:text-black`}>
              {item.icon}
              {isExpanded && <span className="ml-2 dark:text-white">{item.label}</span>}
            </Button>
          ))}

          <div className="my-4 border-t border-[#7d7a7a76] w-full"></div>

          <div className="flex items-center justify-between    w-full">
            {isExpanded && <span className="text-xs dark:text-white cursor-pointer" onClick={()=>setAnimationKey((prev)=>prev+1)}>WORK SPACE</span>}
            <DialogDemo animationKey={animationKey} toggleIcom={<AddIcon /> }id=""  />


          </div>
          <div className="w-full">
           <SpaceLists/>
          </div>
          <div className="my-4 border-t border-[#7d7a7a76] w-full"></div>


        </div>
      </div>
    </aside>
  );
};

export default Aside;

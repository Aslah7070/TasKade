
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

import Aside from "@/components/home/Aside"
export function AppSidebar() {
    const {
        state,
        // open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
      } = useSidebar()
  
      
  return (
    <Sidebar  collapsible="icon" variant="floating"  className=" dark:bg-[#121212]  ">
       <SidebarTrigger className='bg-[#7d7a7a76] border border-white'/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarInset>
            <Aside state={state} />
            </SidebarInset>
        
           
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

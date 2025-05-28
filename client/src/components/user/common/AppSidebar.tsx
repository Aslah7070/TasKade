
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
// import { useIsMobile } from "../../../hooks/use-mobile"
import Aside from "@/components/home/Aside"
import React from "react"
export function AppSidebar() {
        // const isMobile = useIsMobile()
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
    <Sidebar  collapsible="icon" variant="floating"    className={`dark:bg-[#121212] h-full`}>
       <SidebarTrigger />
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

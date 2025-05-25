'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/user/common/AppSidebar'
import { usePathname } from 'next/navigation'
import React from 'react'

export const AppLayoutClient = ({
  children,
  defaultOpen
}: {
  children: React.ReactNode,
  defaultOpen: boolean
}) => {
  const pathname = usePathname()
const hideSidebarPaths = ["/", "/login", "/signup","/reset-password"]
const showSidebar = !hideSidebarPaths.includes(pathname)
if(!showSidebar)return <>{children}</>

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
       
      <AppSidebar />
      <main className="w-full flex flex-col h-full mb-24 sm:mb-0">
        {children}
      </main>
    </SidebarProvider>
  )
} 

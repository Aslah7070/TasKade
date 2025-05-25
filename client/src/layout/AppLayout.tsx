
import { cookies } from "next/headers"
import React from 'react'
import { AppLayoutClient } from './AppLayoutClient'

const AppLayout = async({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

   return <AppLayoutClient defaultOpen={defaultOpen}>{children}</AppLayoutClient>
}

export default AppLayout

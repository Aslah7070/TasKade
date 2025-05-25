"use client"

import * as React from "react"
import { MonitorCog, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className=" text-white bg-black dark:bg-black " align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
             <div className="flex justify-between px-2 hover:bg-blue-500 rounded-md  w-full">
         
         <span>  Light </span>
          <span>  <Sun/></span> 
        
         </div>
    
        
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
         <div className="flex justify-between px-2 hover:bg-blue-500 rounded-md w-full">
         
         <span>  Dark </span>
          <span>  <Moon /></span> 
        
         </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
            <div className="flex justify-between px-2 hover:bg-blue-500 rounded-md w-full">
         
         <span>   System </span>
          <span>  <MonitorCog /></span> 
        
         </div>
         
        
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Spinner } from "@/ui/spinner";
interface AuthloadProps {
  children: ReactNode;
}

export const AuthLoader = ({ children }: AuthloadProps) => {
  const { setUser } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    const cookie = Cookies.get("user");

    if (cookie) {
    
        
      try {
        setUser(JSON.parse(cookie));
      } catch {
        setUser(null);  
      }
    }
    setHasMounted(true);
  }, [setUser]);

  if (!hasMounted) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Spinner/>
        </div>
    )
  }

  return <>{children}</>;
};

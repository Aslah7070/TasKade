
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "../lib/privider";
import { Toaster } from "react-hot-toast";
import 'animate.css';

 import ClientSideLoadingBar from "../ui/useLoadinBar"
import { AuthLoader } from "@/layout/AuthLoader";
import { ThemeProvider } from "@/layout/ThemeLayout";
import AppLayout from "@/layout/AppLayout";
import NavBar from "@/components/landingpage/NavBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taskade",
  description: "Ts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${poppins.className}  bg-pattern dark:bg-pattern-dark`}>
      <ClientSideLoadingBar>
        <Providers>
          <AuthLoader>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >  
          
          <AppLayout>
 <NavBar/>
 {children}
          </AppLayout>
           

          </ThemeProvider> 
          </AuthLoader>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </Providers>
        </ClientSideLoadingBar>
      </body>
    </html>
  );
}
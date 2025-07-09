
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const isUserProtectedRoute = (route: string) => route.startsWith("/user") && route !== "/login" && route !== "/signup";
const isAdminRoute = (route: string) => route.startsWith("/admin") && route !== "/login";
export function middleware(req: NextRequest) {
    const userType = req.cookies.get("type")?.value;
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.clone();
    const pathName = url.pathname;

      const isAuthPage = pathName === "/login" || pathName === "/register"||pathName==="/";
        if (token && isAuthPage) {
    if (userType === "Admin") {
      url.pathname = "/admin/home";
    } else if (userType === "User") {
      url.pathname = "/user/home";
    }
    return NextResponse.redirect(url);
        }

    
      if (!token && (isUserProtectedRoute(pathName) || isAdminRoute(pathName))) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
}
  export const config = {
    matcher: "/:path*",
  };
  
  
//   export const config = {
//     matcher: [
//       "/((?!_next|assets|favicon.ico|api/|reset-password|forgot-password|verify-otp).*)",
//     ],
//   };
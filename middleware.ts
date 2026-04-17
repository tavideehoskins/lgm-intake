import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "lgm-fallback-secret-change-this"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except the login page and login API
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin";
  const isLoginApi = pathname === "/api/admin/login";

  if (isAdminRoute && !isLoginPage && !isLoginApi) {
    const token = req.cookies.get("lgm_admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin", req.url));
      res.cookies.delete("lgm_admin_token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

import { authMiddleware } from "@/lib/auth.edge";
import { NextResponse } from "next/server";

export default authMiddleware((req) => {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.auth;

    // Protected routes
    const protectedPaths = ["/onboarding", "/saas"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    if (isProtected && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // /saas: only superadmin
    if (pathname.startsWith("/saas") && isAuthenticated) {
        const role = (req.auth?.user as { role?: string })?.role;
        if (role !== "superadmin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Redirect logged-in users away from login/register
    const authPaths = ["/login", "/register"];
    if (authPaths.includes(pathname) && isAuthenticated) {
        const role = (req.auth?.user as { role?: string })?.role;
        if (role === "superadmin") {
            return NextResponse.redirect(new URL("/saas", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/onboarding/:path*", "/saas/:path*", "/login", "/register"],
};

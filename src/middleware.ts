import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.auth;

    // Protected routes
    const protectedPaths = ["/dashboard", "/onboarding", "/sistemabase"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    // Admin routes
    const isAdmin = pathname.startsWith("/admin");

    if (isProtected && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdmin && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAdmin && req.auth?.user) {
        const role = (req.auth.user as { role?: string }).role;
        if (role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    // Redirect logged-in users away from login/register
    const authPaths = ["/login", "/register"];
    if (authPaths.includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/admin/:path*", "/sistemabase/:path*", "/login", "/register"],
};

import { authMiddleware } from "@/lib/auth.edge";
import { NextResponse } from "next/server";

export default authMiddleware((req) => {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.auth;

    // Protected routes
    const protectedPaths = ["/admin", "/onboarding", "/saas"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    if (isProtected && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // /admin and /saas: only superadmin
    if ((pathname.startsWith("/admin") || pathname.startsWith("/saas")) && isAuthenticated) {
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
        // For gym_owner: let the login/register page handle the redirect via /api/me/gym
        // We don't redirect here because we need to check the gym slug from the DB
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/onboarding/:path*", "/saas/:path*", "/login", "/register"],
};

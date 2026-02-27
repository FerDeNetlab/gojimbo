import { authMiddleware } from "@/lib/auth.edge";
import { NextResponse } from "next/server";

export default authMiddleware((req) => {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.auth;

    // Protected routes (gym product)
    const protectedPaths = ["/admin", "/onboarding"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    // SaaS routes (superadmin only)
    const isSaaS = pathname.startsWith("/saas");

    if ((isProtected || isSaaS) && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // SaaS: only superadmin
    if (isSaaS && req.auth?.user) {
        const role = (req.auth.user as { role?: string }).role;
        if (role !== "superadmin") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    // Redirect logged-in users away from login/register
    const authPaths = ["/login", "/register"];
    if (authPaths.includes(pathname) && isAuthenticated) {
        const role = (req.auth?.user as { role?: string })?.role;
        if (role === "superadmin") {
            return NextResponse.redirect(new URL("/saas", req.url));
        }
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/onboarding/:path*", "/saas/:path*", "/login", "/register"],
};

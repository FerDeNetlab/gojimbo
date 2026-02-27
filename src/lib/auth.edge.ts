import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config for middleware.
 * This CANNOT import zod, bcryptjs, drizzle, or any Node.js modules.
 * The actual credential validation happens in the full auth.ts (server-side only).
 */
export const { auth: authMiddleware } = NextAuth({
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Credentials must be listed here for the middleware to recognize the provider,
        // but authorize is a no-op since middleware only checks JWT tokens
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize() {
                return null; // actual auth handled by full auth.ts
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role ?? "gym_owner";
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
});

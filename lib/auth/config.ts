import { DefaultSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { Adapter } from "@auth/core/adapters";

/**
 * Extend NextAuth's Session and JWT interfaces to include user ID.
 */
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's unique identifier. */
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }
}

/**
 * Helper function to validate environment variables.
 * Throws an error if the variable is not set.
 */
function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GithubProvider({
      clientId: getEnvVariable("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
      authorization: {
        params: {
          scope: "read:user user:email", // Request access to user emails
        },
      },
    }),
  ],
  secret: getEnvVariable("NEXTAUTH_SECRET"),
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image as string;
      }
      console.log("Session Callback:", session); // Debugging
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) {
        console.log("SignIn Callback: Email is missing.");
        return false; // Abort sign-in
      }
      console.log("SignIn Callback: User signed in with email:", user.email);
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  debug: process.env.NODE_ENV === 'development',
};





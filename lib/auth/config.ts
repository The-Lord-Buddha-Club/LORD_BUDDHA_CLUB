import { DefaultSession, NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // Corrected import
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { Adapter } from "@auth/core/adapters";


declare module "next-auth" {
  interface Session {
    user: {
      
      id: string;
  
      image?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    /** The user's unique identifier. */
    id?: string;
    /** The user's profile image URL. */
    image?: string;
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
    GitHubProvider({ // Corrected provider name
      clientId: getEnvVariable("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
      
      authorization: {
        params: {
          scope: "read:user user:email", // Request access to user emails
        },
      },
      /**
       * Maps GitHub profile data to NextAuth user object.
       */
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url, // Ensure 'image' is correctly mapped
        };
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
    /**
     * JWT callback is called whenever a JSON Web Token is created (i.e., at sign-in) or updated.
     */
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (profile && 'avatar_url' in profile && profile.avatar_url) {
        token.image = profile.avatar_url;
      }
      return token;
    },

    /**
     * Session callback is called whenever a session is checked.
     */
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





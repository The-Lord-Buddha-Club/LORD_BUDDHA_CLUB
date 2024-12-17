import getServerSession, { Session } from "next-auth";
import { authOptions } from "./config";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session;
}
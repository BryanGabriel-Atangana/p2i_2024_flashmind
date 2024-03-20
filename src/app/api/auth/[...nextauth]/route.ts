import { authOptions } from "@/lib/nextAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
export { handler as Get, handler as POST };

import { auth } from "../auth";

export const checkAuth = async () => {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

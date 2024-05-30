import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/authentication",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/") {
        return true;
      }
      return !!token;
    },
  },
});

// Specify the routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*"], 
};

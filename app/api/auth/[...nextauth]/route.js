import { connectToDB } from "@utils/database";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from 'next-auth/providers/google';
import getUser from "@utils/getUser";
export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials;
				try {
					await connectToDB();
					const user = await User.findOne({ email });
					if (!user) {
            console.log("user not found");
						return null;
					}
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (!passwordsMatch) {
            console.log("passwordsMatch:", passwordsMatch);
						return null;
					}
					return user;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
			
		}),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
	],
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
    // async signIn(user) {
      // console.log("inside signIn", user);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        alert("로그인 실패");
        return false;
      }
    },
    async jwt({ token, account, profile }) {

      // console.log("inside jwt token", token);
      // console.log("inside jwt account", account);
      // console.log("inside jwt profile", profile);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token}) {
      // console.log("inside session session:", session);
      // console.log("inside session token:", token);
      const userLogin = await getUser(token.sub);
      // console.log("userLogin:", userLogin);
      session.accessToken = token.accessToken;
      session.user.userId = token.sub;
      session.user.userType =  userLogin.type;
      return {...session, userId: token.sub, userType: userLogin.type};
    },
  },
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

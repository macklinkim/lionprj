import { connectToDB } from "@utils/database";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				try {
					await connectToDB();
					const user = await User.findOne({ email });
					if (!user) {
						return null;
					}
					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (!passwordsMatch) {
						return null;
					}
					return user;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
			callbacks: {
				async signIn({ user, account, profile, email, credentials }) {
					console.log("inside signIn", session, token, user);
					const isAllowedToSignIn = true;
					if (isAllowedToSignIn) {
						return true;
					} else {
						alert("로그인 실패");
						return false;
					}
				},
				async jwt({ token, account, profile }) {
					console.log("inside jwt", session, token, user);
					if (account) {
						token.accessToken = account.access_token;
						token.id = profile.id;
					}
					return token;
				},
				async session({ session, token, user }) {
					console.log("inside session", session, token, user);
					session.accessToken = token.accessToken;
					session.user = user;
					return session;
				},
			},
		}),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
	],

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/Nav";
import { AuthProvider } from "./Providers";
import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ["latin"] });
 const metadata = {
	title: "Like Lion Shopping",
	description: "Like Lion Shopping",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
						<Nav></Nav>
            <RecoilRoot>
						{children}
            </RecoilRoot>
				</AuthProvider>
			</body>
		</html>
	);
}

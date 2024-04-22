"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/Nav";
import { AuthProvider, DarkProviders } from "./Providers";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
const metadata = {
	title: "Like Lion Shopping",
	description: "Like Lion Shopping",
};
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						<RecoilRoot>
							<DarkProviders>
								<Nav></Nav>
								{children}
							</DarkProviders>
						</RecoilRoot>
					</QueryClientProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

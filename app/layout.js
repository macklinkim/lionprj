"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/Nav";
import { AuthProvider } from "./Providers";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
					<Nav></Nav>
					<QueryClientProvider client={queryClient}>
						<RecoilRoot>{children}</RecoilRoot>
					</QueryClientProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

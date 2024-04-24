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
				<div className="h-[100vh] flex flex-col items-center justify-between">
          <div className="flex flex-col w-full justify-between">
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
          </div>
					<footer className="w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-[#181818] dark:border-gray-700">
						<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
							© 2024{" "}
							<a href="https://www.likelion.net/" className="hover:underline">
								멋쟁이 사자들
							</a>
							. All Rights Reserved.
						</span>
						<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
							<li>
								<a href="https://github.com/macklinkim/" className="hover:underline me-4 md:me-6">
									GIT HUB
								</a>
							</li>
							<li>
								<a href="/email" className="hover:underline">
									연락처: kopsert@gmail.com
								</a>
							</li>
						</ul>
					</footer>
				</div>
			</body>
		</html>
	);
}

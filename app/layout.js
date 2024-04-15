import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/Nav";
import { AuthProvider } from "./Providers";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
	title: "Like Lion Shopping",
	description: "Like Lion Shopping",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			
			<body className={inter.className}>
				<AuthProvider>
						<Nav ></Nav>
						{children}
				</AuthProvider>
			</body>
		</html>
	);
}

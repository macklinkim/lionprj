"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
export const AuthProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export function DarkProviders({ children }) {
  return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>{children}</ThemeProvider>
}
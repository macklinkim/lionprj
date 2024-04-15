"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UserInfo from "./UserInfo";
const links = [
	{
		id: 1,
		title: "Home",
		url: "/",
	},
	{
		id: 2,
    title: "shopping",
		url: "/shopping",
		
	},
	{
		id: 3,
    title: "게시판",
		url: "/board",
		
	},
	{
		id: 4,
    title: "About",
		url: "/about",
		
	},
	{
		id: 5,
		title: "Contact",
		url: "/contact",
	}
];
function Nav() {
	const logout = () => {
		console.log("logout");
	};
	const { data: session } = useSession();
	return (
		<div className="flex justify-between mb-1 pt-3 items-start">
			Nav
			<Link href="/" className="flex gap-2 flex-center">
				<Image src="/assets/images/next.svg" alt="logo" width={30} height={30} className="object-contain" />
				<p className="logo_text">Lion ShoppingMall</p>
			</Link>
			<div className="flex gap-5">
				{links.map(link => (
					<Link className="" key={link.id} href={link.url}>
						{" "}
						{link.title}
					</Link>
				))}
				{!session && (
					<Link className="" key={6} href="/login">
						{" "}
						login
					</Link>
				)}
			{session && <UserInfo></UserInfo>}
			</div>
		</div>
	);
}

export default Nav;

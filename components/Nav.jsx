"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UserInfo from "./UserInfo";
import ThemeSwitch from "@components/ThemeSwitch";
const links = [
	{
		id: 1,
		title: "shopping",
		url: "/shopping",
	},
	{
		id: 2,
		title: "게시판",
		url: "/board",
	},
	// {
	// 	id: 4,
	//   title: "About",
	// 	url: "/about",

	// },
	// {
	// 	id: 5,
	// 	title: "Contact",
	// 	url: "/contact",
	// }
];
function Nav() {
	const { data: session } = useSession();
	return (
		<div className="flex justify-between mb-1 p-3 items-center">
			<div className="w-24">{""}</div>

			<Link href="/" className="flex items-center justify-center">
					<Image
						className="hidden dark:block"
						src="/assets/cuteMain2.png"
						alt="dark-mode-image"
						sizes="30vw"
            width={170}
            height={100}
					/>
					<Image
						className="block dark:hidden"
						src="/assets/cuteMain.png"
						alt="light-mode-image"
            width={170}
            height={100}
					/>
			</Link>
			<div className="flex gap-5">
				<div className="flex items-center justify-center">
					모드<ThemeSwitch></ThemeSwitch>
				</div>
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

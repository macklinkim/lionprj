"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UserInfo from "@components/UserInfo";
import ThemeSwitch from "@components/ThemeSwitch";
const links = [
	{
		id: 1,
		title: "쇼핑몰",
		url: "/shopping",
	},
	{
		id: 2,
		title: "게시판",
		url: "/board",
	},
];
function Nav() {
	const { data: session } = useSession();
	return (
		<div className="flex items-center justify-between border-solid shadow-md h-14">
			<div className="flex items-center justify-center gap-3 bg-light-400">
				{!session && (
					<Link className="ml-3 p-3" key={6} href="/login">
						{" "}
						로그인
					</Link>
				)}
				<div className="absolute top-0 left-[3px]">{session && <UserInfo></UserInfo>}</div>
			</div>
			<Link href="/" className="absolute top-0 left-[40%] items-start justify-center hidden sm:block">
				<Image className="hidden dark:block" src="/assets/cuteMain2.png" alt="dark-mode-image" sizes="30vw" width={160} height={100} />
				<Image className="block dark:hidden" src="/assets/cuteMain.png" alt="light-mode-image" width={160} height={100} />
			</Link>
			<div className="flex justify-between p-3 items-center">
				<p className="block sm:hidden">홈으로</p>
				<div className="flex items-center justify-center mx-3">
					<ThemeSwitch></ThemeSwitch>
				</div>
				{links.map(link => (
					<Link className="mx-2" key={link.id} href={link.url}>
						{link.title}
					</Link>
				))}
			</div>
		</div>
	);
}

export default Nav;

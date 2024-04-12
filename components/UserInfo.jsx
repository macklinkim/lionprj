"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserInfo() {
	const { data: session } = useSession();

	return (
		<div className="top-0">
			<div className="shadow-lg p-1 bg-zince-300/10 flex flex-col gap-2 my-1">
				<div>
					Email: <span className="font-bold">{session?.user?.email}</span>
				</div>
				<button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
					로그아웃
				</button>
			</div>
		</div>
	);
}

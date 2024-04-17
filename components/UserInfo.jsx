'use client'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function UserInfo() {
	const { data: session } = useSession();
	return (
		<div className="top-0">
			<div className="shadow-lg p-1 flex flex-col gap-2 my-1">
				<div>
					<span className=" font-bold">{session?.userType ==='admin' ? '관리자' : session?.userType ==='seller'?'판매자':'사용자'}</span>
          <br></br>
					<span className="font-bold">{session?.user?.name}</span>님 환영합니다.
				</div>
				<button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
					로그아웃
				</button>
			</div>
		</div>
	);
}

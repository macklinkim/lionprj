"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function UserInfo() {
	const { data: session } = useSession();
	return (
		<div className="bg-gray-200 top-0 left-0 text-sm absolute ">
			<div className="shadow-lg p-1 flex flex-col gap-2 my-1">
				<div>
					<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span>
					<br></br>
					<span className="text-xs font-bold">{session?.user?.name}</span>님 환영합니다.
				</div>
				<Link href="/mypage/profile">프로필</Link>
				<Link
					href={{
						pathname: "/mypage/product",
						query: { userId: session?.userId },
            
					}}
          as={`/mypage/product/${session?.userId}`}
				>
					내 상품 보기/등록
				</Link>
				<button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
					로그아웃
				</button>
			</div>
		</div>
	);
}

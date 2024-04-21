"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
export default function UserInfo() {
	const { data: session } = useSession();
	const [fold, setFold] = useState(true);
	return (
		<div className="bg-gray-200 top-0 left-0 text-sm absolute ">
			{fold ? (
				<div className="shadow-lg p-1 flex flex-col gap-2 my-1">
					<div>
						<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span> <span className="text-xs font-bold">{session?.user?.name}</span>님 환영합니다.
						<br></br>
						<Button size="xs" onClick={() => setFold(!fold)}>
							펼치기
						</Button>
					</div>
				</div>
			) : (
				<div>
					<div className="shadow-lg p-2 my-1 flex flex-col gap-2 ">
						<div>
							<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span> <span className="text-xs font-bold">{session?.user?.name}</span>님
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
						<Link
							href={{
								pathname: "/cart",
								query: { userId: session?.userId },
							}}
							as={`/cart`}
						>
							장바구니
						</Link>
						<Button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-2 py-2">
							로그아웃
						</Button>
						<Button size="xs" onClick={() => setFold(!fold)}>
							접기
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

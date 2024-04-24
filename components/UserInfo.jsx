"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Button from "@components/Button";
export default function UserInfo() {
	const { data: session } = useSession();
	const [fold, setFold] = useState(true);
	return (
		<div className=" rounded-md text-sm bg-gray-300 dark:bg-gray-600">
			{fold ? (
				<div className="shadow-lg p-1 flex flex-col my-1">
					<div>
						<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span> <span className="text-xs font-bold">{session?.user?.name}</span>{" "}
						<Button size="xs" onClick={() => setFold(!fold)}>
							펼치기
						</Button>
					</div>
				</div>
			) : (
				<div className="m-1">
					<div className="shadow-lg p-2  flex flex-col gap-2 bg-light-400">
						<div>
							<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span> <span className="text-xs font-bold">{session?.user?.name}</span>님
						</div>
						<Link href="/mypage/profile">프로필</Link>
						{session?.userType === "seller" ? (
							<Link href={{ pathname: "/mypage/product", query: { userId: session?.userId } }} as={`/mypage/product/${session?.userId}`}>
								내 상품 보기/등록
							</Link>
						) : null}
						<Link
							href={{
								pathname: `/cart/${session?.user.userId}`,
							}}
						>
							장바구니
						</Link>
						<Button onClick={() => signOut()} className=" rounded bg-red-500 text-white text-xs py-1/2 px-1">
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

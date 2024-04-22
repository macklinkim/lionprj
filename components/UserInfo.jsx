"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ImProfile } from "react-icons/im";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
export default function UserInfo() {
	const { data: session } = useSession();
	const [fold, setFold] = useState(true);
	return (
		<div className=" rounded-md top-0 left-0 text-sm absolute dark:bg-gray-600">
			{fold ? (
				<div className="shadow-lg p-1 flex flex-col my-1">
					<div>
						<ImProfile />
						<span className=" font-bold">{session?.userType === "admin" ? "관리자" : session?.userType === "seller" ? "판매자" : "사용자"}</span> <span className="text-xs font-bold">{session?.user?.name}</span>
					</div>
					<Button size="xs" onClick={() => setFold(!fold)}>
						펼치기
					</Button>
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
								pathname: `/cart/${session?.user.userId}`
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

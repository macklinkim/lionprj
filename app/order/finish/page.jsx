"use client";
import Button from "@components/Button";
import { saveCart } from "@utils/atom.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
// import { }
function OrderFinish({ params }) {
	const a = useRecoilValue(saveCart);
	console.log("[OrderFinish] productid:", a);
	const { data: session } = useSession();
	console.log("[OrderFinish] session:", session);
  const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="my-12 text-4xl">주문 완료</div>
			<br></br>

			<div>
				<Button size="lg" type="button" onClick={() => router.push("/")}>
					홈으로
				</Button>
			</div>
		</div>
	);
}

export default OrderFinish;

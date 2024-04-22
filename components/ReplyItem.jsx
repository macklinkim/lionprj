"use client";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import Button from "./Button";
import { useEffect, useState } from "react";

ReplyItem.propTypes = {
	replyItem: PropTypes.object.isRequired,
	// deleteReply: PropTypes.func.isRequired,
};
function ReplyItem({ replyItem }) {
	const { data: session } = useSession();
	const [userInfo, setUserInfo] = useState();
	const [membershipClass, setMembershipClass] = useState();
	console.log("session:", session);
	const getUser = async () => {
		try {
			const res = await fetch(`/api/user/${replyItem.user_id}`);
			const data = await res.json();
			setUserInfo(data.user);
		} catch (error) {
		}
	};
	const getCode = async () => {
		try {
			const res = await fetch(`/api/code/membershipClass`);
			const data = await res.json();
			data.codes.map(item => {
				if (item.code == userInfo?.extra?.membershipClass) {
					setMembershipClass(item.value);
				}
			});
		} catch (error) {
			console.log("[ReplyItem component]error:", error);
		}
	};
	useEffect(() => {
		getUser();
		getCode();
	}, []);

	async function deleteReply() {
		try {
			const res = fetch(process.env.NEXT_PUBLIC_URL + `/api/reply/${replyItem.reply_id}`, {
				method: "DELETE",
			});
			return res;
		} catch (error) {
			console.log("fetch at deleteReply in ReplyForm:", error);
		}
	}
	return (
		<tr>
			<td>{userInfo.name||session.user.name}</td>
			<td className="p-2 text-center text-[10px] hidden sm:table-cell">{membershipClass}</td>
			<td> {replyItem.content}</td>
			<td className="flex items-center justify-between text-sm">
				<div className="p-2 text-center hidden sm:table-cell"> {replyItem.createdAt}</div>
				{session?.userId == replyItem?.user_id ? (
					<Button type="button" size="xs" onClick={deleteReply}>
						삭제
					</Button>
				) : null}
			</td>
		</tr>
	);
}

export default ReplyItem;

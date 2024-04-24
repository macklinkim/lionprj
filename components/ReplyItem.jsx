"use client";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import Button from "@components/Button";
import { useEffect, useState } from "react";

ReplyItem.propTypes = {
	replyItem: PropTypes.object.isRequired,
	// deleteReply: PropTypes.func.isRequired,
};
function ReplyItem({ replyItem }) {
	const { data: session } = useSession();
	const [userInfo, setUserInfo] = useState();
	const [membershipClass, setMembershipClass] = useState();
	const getUser = async () => {
		try {
			const res = await fetch(`/api/user/${replyItem.user_id}`, {
				cache: "force-cache",
			});
			const data = await res.json();
			const res2 = await fetch(`/api/code/membershipClass`, {
				cache: "force-cache",
			});
			const data2 = await res2.json();
			const codes = data2.codes;
			console.log("[ReplyItem component] codes:", codes);
			setUserInfo(data.user);
			const membership = codes.filter(item => {
				if (item.code == userInfo?.extra.membershipClass) {
					return item;
				}
			});
			console.log("[ReplyItem component] membershipClass:", membership[0].value);
			setMembershipClass(membership[0].value);
			console.log("[ReplyItem component] userInfo:", userInfo);
		} catch (error) {}
	};
	useEffect(() => {
		getUser();
	}, []);

	async function deleteReply() {
		try {
			const res = fetch(`/api/reply/${replyItem.reply_id}`, {
				method: "DELETE",
			});
			return res;
		} catch (error) {
			console.log("fetch at deleteReply in ReplyForm:", error);
		}
	}
	return (
		<tr>
			<td>{userInfo?.name || session?.user.name}</td>
			<td> {replyItem.content}</td>
			<td className="flex items-center justify-between text-sm">
				<div className="p-1 text-center hidden sm:table-cell"> {replyItem.createdAt}</div>
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

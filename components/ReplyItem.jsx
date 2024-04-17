"use client";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import Button from "./Button";

ReplyItem.propTypes = {
	replyItem: PropTypes.object.isRequired,
	// deleteReply: PropTypes.func.isRequired,
};
function ReplyItem({ replyItem }) {
	const { data: session } = useSession();
	// console.log("replyItem:", replyItem);
	// console.log("session:", session?.userId);
  
	async function deleteReply() {
		try {
			// console.log(process.env.NEXT_PUBLIC_URL + `/api/reply/${replyItem.reply_id}`);
			const res = fetch(process.env.NEXT_PUBLIC_URL + `/api/reply/${replyItem.reply_id}`, {
				method: "DELETE",
			});
      // console.log('[ReplyItem component]res:', res);
			return res;
		} catch (error) {
			console.log("fetch at deleteReply in ReplyForm:", error);
		}
	}
	return (
		<div className="grid grid-cols-4">
			<div>{replyItem.userName}</div>
			<div> {replyItem.values}</div>
			<div> {replyItem.content}</div>
			<div className="flex items-center justify-between text-sm">
				<div> {replyItem.createdAt}</div>
				{session?.userId == replyItem?.user_id ? (
					<Button type="button" size="xs" onClick={deleteReply}>
						삭제
					</Button>
				) : null}
			</div>
		</div>
	);
}

export default ReplyItem;

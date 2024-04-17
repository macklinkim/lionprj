"use client";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import Button from "./Button";

ReplyItem.propTypes = {
	replyItem: PropTypes.object.isRequired,
  deleteReply: PropTypes.func.isRequired,
};
function ReplyItem({ replyItem, deleteReply }) {
	const { data: session } = useSession();
	// console.log("replyItem:", replyItem._id);
	// console.log("session:", session.userId);
	return (
		<div className="grid grid-cols-4">
			<div>{replyItem.userName}</div>
			<div> {replyItem.values}</div>
			<div> {replyItem.content}</div>
			<div className="flex items-center justify-between text-sm">
				<div> {replyItem.createdAt}</div>
				{session?.userId == replyItem?._id ? (
					<Button type="button" size="xs" onClick={() => deleteReply(replyItem._id)}>
						{" "}
						삭제{" "}
					</Button>
				) : null}
			</div>
		</div>
	);
}

export default ReplyItem;

import getCode from "@utils/getCode";
import getUser from "@utils/getUser";
import React from "react";
import ReplyItem from "@components/ReplyItem";
import PropTypes from "prop-types";
ReplyForm.propTypes = {
	reply: PropTypes.object.isRequired,
};

async function deleteReply(replyId) {
	"use server";
	console.log("callback test:", replyId);
	try {
    console.log(process.env.NEXT_PUBLIC_URL + `/api/reply/${replyId}`);
		const res = fetch(process.env.NEXT_PUBLIC_URL + `/api/reply/${replyId}`, {
			method: "DELETE",
		});
		return res;
	} catch (error) {
		console.log('fetch at deleteReply in ReplyForm:',error);
	}
}

async function ReplyForm({ reply }) {
	const userInfo = await getUser(reply.user_id);
	// console.log('real:',userInfo?.extra?.membershipClass);
	const values = await getCode("membershipClass", userInfo?.extra?.membershipClass);
	// console.log('values at ReplyForm:',values);
	const replyItem = { _id: reply.user_id, content: reply.content, userName: userInfo?.name, values: values, createdAt: reply.createdAt };
	const test = () => {
		deleteReply(reply._id);
	};
	return (
		<>
			<ReplyItem replyItem={replyItem} deleteReply={deleteReply}></ReplyItem>
		</>
	);
}

export default ReplyForm;

import getCode from "@utils/getCode";
import getUser from "@utils/getUser";
import React from "react";
import ReplyItem from "@components/ReplyItem";
import PropTypes from "prop-types";
ReplyForm.propTypes = {
	reply: PropTypes.object.isRequired,
};
async function ReplyForm({ reply }) {
	const userInfo = await getUser(reply.user_id);
	// console.log('real:',userInfo?.extra?.membershipClass);
	const values = await getCode("membershipClass", userInfo?.extra?.membershipClass);
	// console.log('values at ReplyForm:',values);
	const replyItem = { reply_id: reply._id, user_id: reply.user_id, content: reply.content, userName: userInfo?.name, values: values, createdAt: reply.createdAt };
	return (
		<>
			<ReplyItem replyItem={replyItem} ></ReplyItem>
		</>
	);
}

export default ReplyForm;

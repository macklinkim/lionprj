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
			<section className="p-4 ">
				<table className="border-collapse table-fixed">
					<colgroup>
						<col className="w-[30%] sm:w-[10%]" />
						<col className="w-0 sm:w-[10%]" />
						<col className="w-[70%] sm:w-[50%]" />
						<col className="w-0 sm:w-[30%]" />
					</colgroup>
					<thead>
						<tr className="border-b text-center border-solid border-gray-200">
							<th className="p-2 text-center ">글쓴이</th>
							<th className="p-2 text-center hidden sm:table-cell">등급</th>
							<th className="p-2 text-center ">내용</th>
							<th className="p-2 text-center hidden sm:table-cell">작성일</th>
						</tr>
					</thead>
					{replyItem && (
						<tbody className= "w-full" >
							<ReplyItem replyItem={replyItem}></ReplyItem>
						</tbody>
					)}
				</table>
			</section>
		</>
	);
}

export default ReplyForm;

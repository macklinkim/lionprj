import getCode from "@utils/getCode";
import getUser from "@utils/getUser";
import React from "react";

async function ReplyForm({reply}) {
	const userInfo = await getUser(reply.user_id);
  // console.log('real:',userInfo.extra.membershipClass);
  const values = await getCode('membershipClass', userInfo.extra.membershipClass);
  // console.log('values at ReplyForm:',values);
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>{userInfo.name}</div>
				<div>{values}</div>
				<div>{reply.content}</div>
				<div>{reply.updatedAt||reply.createdAt}</div>
			</div>
		</div>
	);
}

export default ReplyForm;

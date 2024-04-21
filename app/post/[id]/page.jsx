"use client";
import Button from "@components/Button";
import PostReplyItem from "@components/PostReplyItem";
import moment from "moment/moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
function Post({ params }) {
	const { id } = params;
	const [postDetail, setPostDetail] = useState();
	const { data: session } = useSession();
	const router = useRouter();
	console.log("[Post page] session user:", session?.user);
	console.log("[PostDetail page] id:", id);
	const getPostDetail = async () => {
		try {
			const res = await fetch(`/api/post/${id}`,{
        next: { revalidate: 60 },
      });
			const data = await res.json();
			console.log("[PostDetail page] data:", data.res);
			setPostDetail(data.res);
			return data;
		} catch (error) {
			console.log("[PostDetail page] error:", error);
		}
	};
	
	const deletePost = async () => {
		try {
			const res = await fetch(`/api/post/${id}`, {
				method: "DELETE",
			});
			const result = await res.json();
			console.log("[PostDetail page] result:", result);
			if (result.res.deletedCount === 1) {
				alert("게시물 삭제 완료");
			} else {
				alert("게시물 삭제 실패");
			}
			router.push("/board");
		} catch (error) {
			console.log("[PostDetail page] error:", error);
		}
	};
	useEffect(() => {
		getPostDetail();
	}, []);
	const date = moment(postDetail?.updatedAt).format("yyyy-MM-DD HH:mm:ss");

	return (
		<div className="container mx-auto mt-4 px-4">
			{postDetail && (
				<section className="mb-8 p-4">
					<div className="flex items-center justify-between">
						<div className="font-semibold text-xl">제목 : {postDetail.title}</div>
						<div className="text-right text-gray-800">작성자 : {postDetail.user.name}</div>
						<div className="text-right text-gray-800"> 작성일 : {date}</div>
					</div>
					<div className="my-20">
						<div>
							<pre className="w-full p-2 whitespace-pre-wrap">{postDetail.content}</pre>
						</div>
						<hr />
					</div>
					{postDetail.replies.length === 0 ? <div> 댓글 없음</div> : postDetail.replies.map(reply => <PostReplyItem key={reply._id} reply={reply}></PostReplyItem>)}
					<div className="flex items-center justify-end gap-20"></div>
					<Button onClick={() => router.push("/board")}>목록으로</Button>
					{session?.user.userId === postDetail?.user._id && <Button onClick={() => deletePost()}>게시물 삭제</Button>}
					{session?.user.userId === postDetail?.user._id && <Button onClick={() => router.push(`/post/${id}/edit`)}>게시물 수정</Button>}
				</section>
			)}
		</div>
	);
}

export default Post;

"use client";
import Button from "@components/Button";
import PostItem from "@components/PostItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ReactCsspin } from 'react-csspin';
import 'react-csspin/dist/style.css';
const PostList = ({ data }) => {
	const list = data.map(post => (
		<PostItem key={post._id} post={post}>
			{post.title}
		</PostItem>
	));
	return list;
};
function Board() {
	const [posts, setPosts] = useState();
	const router = useRouter();
	const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
	console.log("[board page] session user:", session?.user);
	const getPosts = async () => {
		try {
      const res = await fetch("/api/post", {
        next: { revalidate: 60 },
      });
			const data = await res.json();
			console.log("[board page] data.res:", data.res);
			setPosts(data.res);
      setLoading(false);
			return data.res;
		} catch (error) {
			console.log("[board page] error:", error);
		}
	};
	useEffect(() => {
		getPosts();
	}, []);
	const handleNewPost = () => {
		router.push("/post/new");
	};
	return (
		<div>
			<section className="p-4">
				<div className="flex items-center justify-end">
					<Button onClick={handleNewPost}>글쓰기</Button>
				</div>
				<table className="border-collapse w-full table-fixed">
					<colgroup>
						<col className="w-[10%] sm:w-[10%]" />
						<col className="w-[60%] sm:w-[30%]" />
						<col className="w-[30%] sm:w-[15%]" />
						<col className="w-0 sm:w-[10%]" />
						<col className="w-0 sm:w-[10%]" />
						<col className="w-0 sm:w-[25%]" />
					</colgroup>
					<thead>
						<tr className="border-b border-solid border-gray-200">
							<th className="p-2 whitespace-nowrap">번호</th>
							<th className="p-2 whitespace-nowrap">제목</th>
							<th className="p-2 whitespace-nowrap">글쓴이</th>
							<th className="p-2 whitespace-nowrap hidden sm:table-cell">조회수</th>
							<th className="p-2 whitespace-nowrap hidden sm:table-cell">댓글수</th>
							<th className="p-2 whitespace-nowrap hidden sm:table-cell">작성일</th>
						</tr>
					</thead>
          { loading && (
              <ReactCsspin message="로딩중..." />
            ) }
					{posts && (
						<tbody>
							<PostList data={posts}></PostList>
						</tbody>
					)}
				</table>
			</section>
		</div>
	);
}

export default Board;

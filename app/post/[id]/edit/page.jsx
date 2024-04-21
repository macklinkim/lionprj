"use client";
import Button from "@components/Button";
import Submit from "@components/Submit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function PostEdit({ params }) {
	const { id } = params;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const getPostDetail = async () => {
		try {
			const res = await fetch(`/api/post/${id}`, {
				next: { revalidate: 60 },
			});
			const data = await res.json();
			console.log("[PostDetail page] data:", data.res);
			setValue("title", data.res.title);
			setValue("content", data.res.content);
			return data;
		} catch (error) {
			console.log("[PostDetail page] error:", error);
		}
	};
	useEffect(() => {
		getPostDetail();
	}, []);

	const router = useRouter();
	const { data: session } = useSession();
	console.log("[PostEdit page] session user:", session?.user);
	const onSubmit = async ({ title, content }) => {
		console.log("[PostEdit page] formData:", title, content);
		try {
			const res = await fetch(`/api/post/${id}`, {
				method: "PATCH",
				body: JSON.stringify({ title: title, content: content }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			console.log("[PostEdit page] data:", data.res);
			if (data.res.modifiedCount === 1) {
				alert("게시물 수정");
				router.push(`/post/${id}`);
			} else {
				alert("게시물 수정 실패");
			}
		} catch (error) {
			console.log("[PostEdit page] error:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center ">
			<div className="text-center">
				<h2 className="text-2xl">게시물 수정</h2>
			</div>
			<section className="dark:text-gray-400 mb-8 p-4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-4">
						<label className="text-lg content-center" htmlFor="title">
							제목
						</label>
						<input
							type="text"
							id="title"
							placeholder="제목을 입력하세요."
							className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
							{...register("title", {
								required: "제목을 입력하세요.",
							})}
						/>
						{errors.title && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{errors.title.message}</p>}
					</div>
					<div className="my-4">
						<label className="text-lg content-center" htmlFor="content">
							내용
						</label>
						<textarea
							id="content"
							rows="15"
							placeholder="내용을 입력하세요."
							className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							{...register("content", {
								required: "내용을 입력하세요.",
							})}
						/>
						{errors.content && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{errors.content.message}</p>}
					</div>
					<hr />
					<div className="flex justify-end my-6">
						<Submit>수정</Submit>
						<Button bgColor="gray" onClick={() => router.push("/boards")}>
							취소
						</Button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default PostEdit;

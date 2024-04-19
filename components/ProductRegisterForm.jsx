"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import ImageUpload from "./ImageUpload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function ProductRegisterForm() {
	const { data: session } = useSession();
	const [filename, setFilename] = useState([]);
	const router = useRouter();
	const myFilenames = filename => {
		setFilename(filename);
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = async formData => {
    
		// console.log(formData);
		// console.log("filename:", filename);
		try {
			// console.log(process.env.NEXT_PUBLIC_URL + "/api/product");
			const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/product", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ ...formData, seller_id: session.userId, filename: filename }),
			});
			console.log("[ProductRegisterForm] res:", res);
			if (res.status === 200&&
      res.url.endsWith("/api/product")) {
				alert("상품등록에 성공했습니다.");
        router.back();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div>ProductRegisterForm</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="name">
						상품명
					</label>
					<input
						className="col-span-3"
						type="text"
						id="text"
						placeholder="상품명을 입력하세요."
						{...register("name", {
							required: "상품명을 입력하세요.",
							minLength: { value: 2, message: "상품명을 2글자 이상 입력하세요." },
						})}
					/>
					{errors.name && errors.name.type === "minLength" && <div>{errors.name.message}</div>}
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="content">
						상품설명
					</label>
					<input
						className="col-span-3"
						type="text"
						id="text"
						placeholder="상품설명을 입력하세요."
						{...register("content", {
							required: "상품설명을 입력하세요.",
							minLength: { value: 2, message: "상품설명을 2글자 이상 입력하세요." },
						})}
					/>
					{errors.content && errors.content.type === "minLength" && <div>{errors.content.message}</div>}
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="quantity">
						재고량
					</label>
					<input className="col-span-3" type="number" id="quantity" placeholder="재고량" {...register("quantity", { required: "재고량을 입력하세요.", min: { value: 1, message: "상품명을 2글자 이상 입력하세요." } })} />
					{errors.quantity && errors.quantity.type === "min" && <div>{errors.quantity.message}</div>}
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="price">
						가격
					</label>
					<input className="col-span-3" type="number" id="price" placeholder="가격" {...register("price", { required: "가격을 입력하세요.", min: { value: 2, message: "상품명을 2글자 이상 입력하세요." } })} />
					{errors.price && errors.price.type === "min" && <div>{errors.price.message}</div>}
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="show">
						상품 전시
					</label>
					<input className="col-span-3" type="checkbox" id="show" {...register("show")} />
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="active">
						상품 상태
					</label>
					<input className="col-span-3" type="checkbox" id="active" {...register("active")} />
				</div>
				<div className="grid grid-cols-4">
					<label className="col-span-1" htmlFor="image">
						상품이미지
					</label>
					<input className="col-span-3" type="text" id="filename" {...register("filename")} />
				</div>
				<div>
					<ImageUpload myFilenames={myFilenames}></ImageUpload>
				</div>
				<Button type="submit">상품등록</Button>
			</form>
		</div>
	);
}

export default ProductRegisterForm;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";
const errorStyle = {
	fontSize: "0.7rem",
	color: "red",
};
function UserRegisterForm() {
	const router = useRouter();
	const [srvError, setSrvError] = useState();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			type: "user",
			password: "",
		},
	});
	function stringify(obj) {
		let cache = [];
		let str = JSON.stringify(obj, function (key, value) {
			if (typeof value === "object" && value !== null) {
				if (cache.indexOf(value) !== -1) {
					return;
				}
				cache.push(value);
			}
			return value;
		});
		cache = null;
		return str;
	}

	const handleComplete = data => {
		setValue("address1", data.address);
	};

	const onSubmit = async formData => {
		console.log("[UserRegisterForm] formData:", formData);
		let newFormData = {};
		if (formData.password1 !== formData.password2) {
			alert("확인 비밀번호가 다릅니다.");
			return;
		} else {
			newFormData = produce(formData, draft => {
				draft.password = formData.password1;
				delete draft.password1;
				delete draft.password2;
				draft.phone = "010" + formData.phone;
			});
		}
		try {
			const resUserExists = await fetch("api/userExists", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: stringify(email),
			});
			const { user } = await resUserExists.json();

			if (user) {
				setSrvError("user already exist.");
				return;
			}

			const res = await fetch("api/register", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					...newFormData,
				}),
			});
			if (res.ok) {
				reset();
				alert("가입 완료 되었습니다.");
				router.push("/login");
			} else {
				console.log("registration failed.");
			}
		} catch (error) {
			console.log("error during registration.", error);
		}
	};
	return (
		<div className="flex items-center justify-center ">
			<div className="p-8 shadow-md rounded-lg w-full max-w-md ">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<label htmlFor="email">이메일</label>
					<input
						className="rounded-lg dark:bg-gray-600 px-1"
						name="email"
						id="email"
						type="email"
						{...register("email", {
							required: "이메일을 입력하세요.",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "이메일 형식이 아닙니다.",
							},
						})}
					/>
					{errors && <div style={errorStyle}>{errors.email?.message}</div>}
					<label htmlFor="password1">비밀번호</label>
					<input
						className="rounded-lg dark:bg-gray-600 px-1"
						name="password1"
						id="password1"
						type="password"
						{...register("password1", {
							required: "비밀번호는 필수 입니다.",
							minLength: 8,
						})}
					/>
					{errors && <div style={errorStyle}>{errors.password1?.message}</div>}
					<label htmlFor="password2">비밀번호 확인</label>
					<input
						className="rounded-lg dark:bg-gray-600 px-1"
						name="password2"
						id="password2"
						type="password"
						{...register("password2", {
							required: "비밀번호는 필수 입니다.",
							minLength: 8,
						})}
					/>
					{errors && <div style={errorStyle}>{errors.password2?.message}</div>}
					<div className="my-3 w-full">
						<label htmlFor="">이름</label>
						<input className="rounded-lg dark:bg-gray-600  px-1" name="name" id="name" type="text" {...register("name", { required: "이름 필수 입니다.", minLength: 2 })} />
						{errors && <div style={errorStyle}>{errors.name?.message}</div>}
						<label htmlFor="type">가입유형</label>
						<select className="rounded-lg dark:bg-gray-600" name="type" id="type" {...register("type", { required: "가입유형 필수 입니다." })}>
							<option value="user">일반사용자</option>
							<option value="seller">판매자</option>
						</select>
						{errors && <div style={errorStyle}>{errors.type?.message}</div>}
					</div>

					<label htmlFor="phone">휴대전화 번호(-제외): </label>
					<div style={{ display: "flex", alignItems: "center" }}>
						<p className="mx-3">010</p>
						<input
							className="rounded-lg dark:bg-gray-600 px-1"
							type="tel"
							id="phone"
							name="phone"
							placeholder="12345678"
							{...register("phone", {
								required: "휴대전화 번호를 입력해주세요.",
								pattern: {
									value: /^[0-9]{7,8}$/,
									message: "올바른 휴대전화 번호 형식이 아닙니다.",
								},
							})}
						/>
					</div>
					{errors && <div style={errorStyle}>{errors.phone?.message}</div>}
					<div>
						<div className="w-[70%] text-xl flex flex-col justify-center items-start">
							<label htmlFor="address">주소</label>
							<input className="w-full border-solid border-2 border-gray-300" type="text" name="address1" id="address1" readOnly={true} {...register("address1", { required: "배송주소를 입력해주세요." })}></input>
							<DaumPostcode onComplete={handleComplete} />
						</div>
						<div className="w-[70%]">
							<label htmlFor="address">나머지 주소</label>
							<input className="w-full border-solid border-2 border-gray-300" type="text" name="address2" id="address2" {...register("address2", { required: "나머지 주소를 입력해주세요." })}></input>
						</div>
					</div>
					{errors && <div style={errorStyle}>{errors.address?.message}</div>}

					<button type="submit">가입하기</button>
					<button type="button" onClick={() => reset()}>
						취소
					</button>
					{srvError && <div style={{ color: "red", fontSize: "10px" }}>{srvError}</div>}
				</form>
			</div>
		</div>
	);
}

export default UserRegisterForm;

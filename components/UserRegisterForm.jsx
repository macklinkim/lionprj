"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { produce } from "immer";
import { useRouter } from "next/navigation";
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
	} = useForm({
		defaultValues: {
			type: "user",
			password: "",
		},
	});
  function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
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
	const onSubmit = async formData => {
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
				body: stringify(email)
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
					...newFormData
				}),
			});
			if (res.ok) {
				reset();
				router.push("/");
			} else {
				console.log("registration failed.");
			}
		} catch (error) {
			console.log("error during registration.", error);
      
			// setSrvError(error);
		}

		// const res = await axios
		// 	.post("/users", newFormData)
		// 	.then(function (response) {
		// 		console.log("데이터 가져오기 성공:", response.data);
		// 	})
		// 	.catch(function (error) {
		// 		console.error("데이터 가져오기 실패:", error.response.data.message);
		// 		setSrvError(error.response.data.message);
		// 	});
		// navigate(`/users/${res.data.item._id}/id`);
	};
	return (
		<div className="flex items-center justify-center">
			<div className="p-8 shadow-md rounded-lg w-full max-w-md dark:bg-gray-600">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<label htmlFor="email">이메일</label>
					<input
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
						name="password2"
						id="password2"
						type="password"
						{...register("password2", {
							required: "비밀번호는 필수 입니다.",
							minLength: 8,
						})}
					/>
					{errors && <div style={errorStyle}>{errors.password2?.message}</div>}
					<label htmlFor="">이름</label>
					<input name="name" id="name" type="text" {...register("name", { required: "이름 필수 입니다.", minLength: 2 })} />
					{errors && <div style={errorStyle}>{errors.name?.message}</div>}
					<label htmlFor="type">가입유형</label>
					<select name="type" id="type" {...register("type", { required: "가입유형 필수 입니다." })}>
						<option value="user">일반사용자</option>
						<option value="seller">판매자</option>
					</select>
					{errors && <div style={errorStyle}>{errors.type?.message}</div>}

					<label htmlFor="phone">휴대전화 번호(-제외): </label>
					<div style={{ display: "flex", alignItems: "center" }}>
						<p>010</p>
						<input
							style={{ height: "1rem" }}
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
					<label htmlFor="">주소</label>
					<input name="address" id="address" type="text" {...register("address", { required: "주소 필수 입니다." })} />
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

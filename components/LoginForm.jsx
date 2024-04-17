"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
function LoginForm() {
	const {
		register,
		handleSubmit,
    watch,
		formState: { errors },
		setError,
	} = useForm({
		values: {
			email: "test@test.com",
			password: "123123123",
		},
	});
	const router = useRouter();
	const onSubmit = async formData => {
		try {
			await signIn("credentials", {
				...formData,
				redirect: true,
        callbackUrl: "/",
      });
		} catch (err) {
			if (err.response?.data.errors) {
				// API 서버가 응답한 에러
				err.response?.data.errors.forEach(error => setError(error.path, { message: error.msg }));
        window.alert(err.response?.data.errors[0].msg);
			} else if (err.response?.data.message) {
				window.alert(err.response?.data.message);
			}
		}
	};
	return (
		<div className="min-w-80 flex-grow flex items-center justify-center">
			<div className="p-8 shadow-md rounded-lg w-full max-w-md dark:bg-gray-600">
				<div className="text-center py-4">
					<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">로그인</h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="email">
							이메일
						</label>
						<input
							type="email"
							id="email"
							placeholder="이메일을 입력하세요"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
							{...register("email", {
								required: "이메일을 입력하세요.",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "이메일 형식이 아닙니다.",
								},
							})}
						/>
						{errors.email && <p className="ml-2 mt-1 text-sm text-red-500">{errors.email.message}</p>}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="password">
							비밀번호
						</label>
						<input
							type="password"
							id="password"
							placeholder="비밀번호를 입력하세요"
							className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
							{...register("password", {
								required: "비밀번호를 입력하세요.",
							})}
						/>
						{errors.password && <p className="ml-2 mt-1 text-sm text-red-500">{errors.password.message}</p>}
						<Link className="block mt-6 ml-auto text-gray-500 dark:text-gray-300 hover:underline" href="#">
							비밀번호를 잊으셨나요?
						</Link>
					</div>
					<div className="mt-4 flex justify-center items-center">
						<button className="dark:bg-gray-700 border rounded-lg p-3 ml-8 text-blue-500 hover:underline" type="submit">
							로그인
						</button>
						<Link className="dark:bg-gray-700 border rounded-lg p-3 ml-8 text-blue-500 hover:underline" href="/register">
							회원가입
						</Link>
					</div>
				</form>
        <Link href='/googlelogin'>Google Login</Link>			</div>
		</div>
	);
}

export default LoginForm;

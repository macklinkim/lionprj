"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "@components/Button";
import { useRouter } from "next/navigation";
function Email() {
	const form = useRef();
  const router = useRouter();
	const sendEmail = async (e) => {
		e.preventDefault();
		await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE, form.current, process.env.NEXT_PUBLIC_EMAIL_PRIVATE).then(
			result => {
				alert("메일 보냈습니다.")
        router.push('/');
			},
			error => {
				alert("메일 못보냈어요!");
        router.push('/');
			}
		);
	};
	return (
		<form className="flex items-center justify-center my-5" ref={form} onSubmit={sendEmail}>
			<div className="flex flex-col items-center justify-center w-[500px]">
        <label className="my-3 self-start" htmlFor="from_name">김천호에게 메일 보내기</label>
				<input className="w-full border-solid border-2 border-gray-300" name="from_name" type="email" placeholder="보내는 이" required/>
        <label className="my-3 self-start" htmlFor="message">메일내용</label>
				<textarea className="w-[500px] border-solid border-2 border-gray-300" name="message" placeholder="메시지" required></textarea>
				<Button type="submit">메일보내기</Button>
			</div>
		</form>
	);
}

export default Email;

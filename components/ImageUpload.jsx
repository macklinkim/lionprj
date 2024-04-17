"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
ImageUpload.propType = {
	myFilenames: PropTypes.func,
};
function ImageUpload({ myFilenames }) {
	const router = useRouter();
	const [image, setImage] = useState("");
	const [result, setResult] = useState(false);
	const [filename, setFilename] = useState("undefinedName.jpeg");
	myFilenames(filename);
	async function convertToBase64(e) {
		const reader = new FileReader();
		setFilename(e.target.files[0].name);
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			// console.log(reader.result);
			setImage(reader.result);
			setResult(false);
		};
		reader.onerror = error => {
			console.log("Error: ", error);
		};
	}
	const uploadImage = async () => {
		// console.log("image", image);
		if (!image) {
			console.log("image fetch shit even empty", image);
		}
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/upload/`, {
				cache: "no-store",
				method: "POST",
				body: JSON.stringify({
					base64: image,
					filename: filename,
				}),
				next: { revalidate: +process.env.NEXT_PUBLIC_REVALIDATE },
			});
			myFilenames(filename);
			console.log("[ImageUpload component] res:", res);
			if (res.status === 200 && res.url.endsWith("/api/upload")) {
				setImage("");
				setResult(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="auth-wrapper">
			<div className="auth-inner flex">
				<div className="flex flex-col">
					<input type="file" accept="image" onChange={convertToBase64} />
					{image && <Image src={image} width={300} height={300} alt="hello" />}
					<button onClick={uploadImage}>upload</button>
				</div>
				{result && <div>이미지 업로드 성공</div>}
			</div>
		</div>
	);
}

export default ImageUpload;

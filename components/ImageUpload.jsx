"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function ImageUpload() {
	const router = useRouter();
	const [image, setImage] = useState("");
	const [filename, setFilename] = useState("undefinedName.jpeg");
	async function convertToBase64(e) {
		const reader = new FileReader();
    setFilename(e.target.files[0].name);
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			console.log(reader.result);
			setImage(reader.result);
		};
		reader.onerror = error => {
			console.log("Error: ", error);
		};
	}
	const uploadImage = async () => {
		console.log("image", image);
		if (!image) {
			console.log("image fetch shit even empty", image);
		}
		const res = await fetch(`api/upload/${filename}`, {
			cache: "no-store",
			method: "POST",
			body: JSON.stringify({
				base64: image,
			}),
			next: { revalidate: 0 },
		}).catch(error => console.log(error));
	};
	return (
		<div className="auth-wrapper">
			<div className="auth-inner flex">
				<input type="file" accept="image" onChange={convertToBase64} />
				{image && <Image src={image} width={300} height={300} alt="hello" />}

				<button onClick={uploadImage}>upload</button>
			</div>
		</div>
	);
}

export default ImageUpload;

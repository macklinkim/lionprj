/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";

const getImageFromSvr = async () => {
	//local로 변경
  console.log('test');
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL + "/api/images", {
			cache: "no-store",
		});
		if (!res) {
			throw new Error("Failed to fetch image");
		}
		return res.json();
	} catch (error) {
		console.log("Error loading image: ", error);
	}
};
async function GetImage() {
	const res = await getImageFromSvr();
	console.log("res", res);
	return <div>Image</div>;
}

export default GetImage;

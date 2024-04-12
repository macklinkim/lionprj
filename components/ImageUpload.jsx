'use client'
import Image from "next/image";
import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState('')
  function convertToBase64(e){
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    }
    reader.onerror = (error) => {
      console.log("Error: ", error);
    }
  }
	return (
		<div className="auth-wrapper">
			<div className="auth-inner flex">
				<input type="file" accept="image" onChange={convertToBase64} />
        <Image
        src={image}
        width={300}
        height={300}
        />
			</div>
		</div>
	);
}

export default ImageUpload;

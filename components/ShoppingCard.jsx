'use client'
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import parse from 'html-react-parser';
ShoppingCard.propType = {
	item: PropTypes.object,
};
function ShoppingCard({ item }) {
  const [image, setImage] = useState("");
  const retrieveImage = async (item) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL + `/api/download/${item.mainImages[0].fileName}`, {
        next: { revalidate: process.env.NEXT_PUBLIC_REVALDATE },
      });
      const pos = await res.json()
      // console.log(pos);
      setImage(pos.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveImage(item);
  }, [])
	return (
		<div className="border border-blue-200">
      {image && <Image src={image} width={300} height={300} alt="hello" />}
      <div>{item.name}</div>
			<div>{item.price}</div>
			<div>{item.title}</div>
      <div> {parse(item.content)}</div>
		</div>
	);
}

export default ShoppingCard;

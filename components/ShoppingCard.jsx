"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
ShoppingCard.propType = {
	item: PropTypes.object,
};
function ShoppingCard({ item }) {
	const getImage = async item => {
		try {
			const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_URL + `/api/download/${item.mainImages[0].fileName}`, {
        cache: 'force-cache' ,
			});
			const pos = await res.json();
			// console.log(pos);
			setImage(pos.image);
		} catch (error) {
			console.log(error);
		}
	};
	const [image, setImage] = useState("");
	useEffect(() => {
		getImage(item);
	}, []);
	return (
		<div className="border border-blue-200">
			{image && (
				<Link href={{ pathname: `/product/${item._id}` }}>
					<Image src={image} width={300} height={300} alt="hello" />
					<div>{item.name}</div>
					<div>{item.price}</div>
				</Link>
			)}
		</div>
	);
}

export default ShoppingCard;

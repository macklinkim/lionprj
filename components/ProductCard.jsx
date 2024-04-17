// 'use client'
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import getImages from "@utils/getImages";
// import { useEffect, useState } from "react";

ProductCard.propType = {
	item: PropTypes.object,
	isMyProduct: PropTypes.bool,
};
// function ProductCard({ item }) {
async function ProductCard({ item, isMyProduct }) {
	// const [image, setImage] = useState();
	// const test = async () => {
	// 	const res = await getImages(item.mainImages[0].fileName);
	//   console.log(res);
	//   setImage(res);
	// };
	// useEffect(() => {
	// 	// getImages(item.mainImages[0].fileName).then(res => setImage(res));
	// 	// const image = getImages(item.mainImages[0].fileName);
	//   test();
	// }, []);
	let image = null;
	if (!isMyProduct) {
		image = await getImages(item.mainImages[0].fileName);
	}
	return (
		<div className="border border-blue-200">
      {isMyProduct && <Link className="grid grid-cols-5 gap-4" href={{ pathname: `/product/${item._id}` }}>
				<div className="col-span-4">{item.name}</div>
				<div className="col-span-1">{item.price}원</div>
			</Link>}
      {!isMyProduct&&<Link className="flex flex-col items-center justify-between" href={{ pathname: `/product/${item._id}` }}>
				<Image src={image} width={200} height={200} alt="hello" />
				<div>{item.name}</div>
				<div>{item.price}</div>
			</Link>}
			
		</div>
	);
}

export default ProductCard;

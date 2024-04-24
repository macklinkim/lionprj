import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import getImages from "@utils/getImages";

ProductCard.propType = {
	item: PropTypes.object,
	isMyProduct: PropTypes.bool,
};
async function ProductCard({ item, isMyProduct }) {
	let image = null;
	if (!isMyProduct) {
		image = await getImages(item.mainImages[0].fileName);
	}
	return (
		<div className="border border-gray-200 dark:border-gray-800">
			{isMyProduct && (
				<Link className="grid grid-cols-5 gap-4" href={{ pathname: `/product/${item._id}` }}>
					<div className="col-span-4">{item.name}</div>
					<div className="col-span-1">{item.price}원</div>
				</Link>
			)}
			{!isMyProduct && (
				<Link className="flex flex-col items-center justify-between h-[100%]" href={{ pathname: `/product/${item._id}` }}>
					<div>
						<Image src={image} width={200} height={200} alt="hello" />
						<p className="px-3 text-[12px] text-wrap break-words sm break-all text-ellipsis">{item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}</p>
					</div>
					<div className="w-[100%] flex flex-col justify-between px-3 pb-2">
						<div className="text-[12px]">판매가 {item.price.toLocaleString("ko-KR")}원</div>
					</div>
				</Link>
			)}
		</div>
	);
}

export default ProductCard;

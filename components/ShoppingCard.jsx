import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import getImages from "@utils/getImages";

ShoppingCard.propType = {
	item: PropTypes.object,
};
async function ShoppingCard({ item }) {
	const image = await	getImages(item.mainImages[0].fileName);
	return (
		<div className="border border-blue-200">
			{image && (
				<Link className="flex flex-col items-center justify-between" href={{ pathname: `/product/${item._id}` }}>
					<Image src={image} width={300} height={300} alt="hello" />
					<div>{item.name}</div>
					<div>{item.price}</div>
				</Link>
			)}
      
      
		</div>
	);
}

export default ShoppingCard;

import React from "react";
import PropTypes from "prop-types";
ShoppingCard.propType = {
	item: PropTypes.object,
};
function ShoppingCard({ item }) {
  console.log(item);
	return (
		<div className="border border-blue-200">
			<div>{item.price}</div>
			<div>{item.title}</div>
		</div>
	);
}

export default ShoppingCard;

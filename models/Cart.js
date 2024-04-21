import { Schema, model, models } from "mongoose";

const CartSchema = new Schema(
	{
		_id: {
			type: Number,
		},
		user_id: {
			type: Number,
		},
		product_id: {
			type: Number,
		},
		quantity: {
			type: Object,
		},
	},
	{ _id: false }
);
CartSchema.set("timestamps", true);
const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;

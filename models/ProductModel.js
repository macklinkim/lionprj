import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
	{
		_id: {
			type: Number,
			required: [true, "ID is required!"],
		},
		name: {
			type: String,
			required: [true, "Name is required!"],
		},
		active: {
			type: Boolean,
		},
		buyQuantity: {
			type: Number,
		},
		content: {
			type: String,
		},
		createdAt: {
			type: String,
		},
		mainImages: {
			type: Array,
		},
		quantity: {
			type: Number,
		},
		price: {
			type: Number,
		},
		seller_id: {
			type: Number,
		},
		shippingFees: {
			type: Number,
		},
		show: {
			type: Boolean,
		},
		updatedAt: {
			type: String,
		},
	},
	{ _id: false }
);
ProductSchema.set("timestamps", true);
const ProductModel = models.product || model("product", ProductSchema);
export default ProductModel;

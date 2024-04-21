import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
	{
		_id: {
			type: Number,
			required: [true, "ID is required!"],
			unique: true,
		},
		content: {
			type: String,
		},
		title: {
			type: String,
		},
		user: {
			type: Object,
		},
		product_id: {
			type: Number,
		},
		type: {
			type: String,
		},
		seller_id: {
			type: Number,
		},
		replies: {
			type: Array,
		},
    createdAt:{
      type:Date,
      get:(createdAt) => createdAt.toLocaleDateString(),
    }
	},
	{ _id: false }
);
PostSchema.set("timestamps", true);
const Post = models.post || model("post", PostSchema);

export default Post;

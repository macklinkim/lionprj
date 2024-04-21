import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		_id: {
			type: Number,
			unique: [true, "_id already exists!"],
			required: [true, "_id is required!"],
		},
		email: {
			type: String,
			unique: [true, "Email already exists!"],
			required: [true, "Email is required!"],
		},
		name: {
			type: String,
			required: [true, "Username is required!"],
		},
		password: {
			type: String,
			required: [true, "Password is required!"],
		},
		address: {
			type: String,
			required: [true, "address is required!"],
		},
		phone: {
			type: String,
			required: [true, "phone is required!"],
		},
		type: {
			type: String,
			required: [true, "type is required!"],
		},
		image: {
			type: String,
		},
	},
	{ _id: false }
);
UserSchema.set("timestamps", true);
const User = models.User || model("User", UserSchema);

export default User;

import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment";
// autoIncrement.initialize(mongoose.connection);
let isConnected = false; // track the connection

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "99",
		});

		isConnected = true;

		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
};
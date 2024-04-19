import { Schema, model, models } from "mongoose";

const SeqSchema = new Schema({
	_id: {
		type: String,
	},
	no: {
		type: Number,
	},
},{_id:false});
SeqSchema.set("timestamps", true);
const Seq = models.Seq || model("Seq", SeqSchema);

export default Seq;

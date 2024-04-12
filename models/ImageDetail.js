import { Schema, model, models } from "mongoose";

const ImageDetailSchema = new Schema({
  _id:{
    image:String
  },
});

const ImageDetail = models.ImageDetail || model("ImageDetail", ImageDetailSchema);

export default ImageDetail;
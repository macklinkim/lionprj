import { Schema, model, models } from "mongoose";

const ImageDetailSchema = new Schema({
  image:{
    type:String,
    required: [true, 'image is required!'],
  },
  filename:{
    type:String,
    required: [true, 'filename is required!'],
  }
});

const ImageDetail = models.ImageDetail || model("ImageDetail", ImageDetailSchema);

export default ImageDetail;
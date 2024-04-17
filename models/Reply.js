import { Schema, model, models } from 'mongoose';

const ReplySchema = new Schema({
  _id:{
    type:Number,
    required:[true, 'ID is required!'],
    unique:true,
  },
  content:{
    type:String,
  },
  order_id:{
    type:Number,
  },
  product_id:{
    type:Number,
  },
  user_id:{
    type:Number,
  },
  rating:{
    type:Number,
  },
  createdAt:{
    type:String,
  }
});
ReplySchema.set('timestamps', true);
const Reply = models.Reply || model("Reply", ReplySchema);

export default Reply;
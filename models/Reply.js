import { Schema, model, models } from 'mongoose';

const ReplySchema = new Schema({
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
const Reply = models.Reply || model("Reply", ReplySchema);

export default Reply;
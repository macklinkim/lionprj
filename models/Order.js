import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
_id:{
    type:Number,
  },
  user_id:{
    type:Number,
  },
  products:{
    type:Array,
  },
  cost:{
    type:Object,
  },
  address:{
    type:Object,
  },
},{_id:false});
OrderSchema.set('timestamps', true);
const Order = models.Order || model("Order", OrderSchema);

export default Order;
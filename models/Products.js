import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Username is required!'],
  },
  password:{
    type:String,
    required: [true, 'Password is required!'],
  },
  address:{
    type:String,
    required: [true, 'address is required!'],
  },
  phone:{
    type:String,
    required: [true, 'phone is required!'],
  },
  type:{
    type:String,
    required: [true, 'type is required!'],
  },
  image: {
    type: String,
  }
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
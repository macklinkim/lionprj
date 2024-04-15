import { Schema, model, models } from 'mongoose';

const CodeSchema = new Schema({
_id:{
    type:String,
  },
  title:{
    type:Number,
  },
  codes:{
    type:Array,
  },
});
const Code = models.Code || model("Code", CodeSchema);

export default Code;
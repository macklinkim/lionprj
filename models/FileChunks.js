import { ObjectId } from "mongodb";
import { NativeBuffer, Schema, model, models } from "mongoose";
const fileSchema = new Schema({
    files_id:ObjectId,
    data: NativeBuffer,
    // Other fields as needed
});

const FileModel = models.uploadchunks || model('uploadchunks', fileSchema);

export default FileModel;
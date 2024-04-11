import { Schema, model, models } from "mongoose";
const fileSchema = new Schema({
    fileName: String,
    // Other fields as needed
});

const FileModel = models.uploadfiles || model('uploadfiles', fileSchema);

export default FileModel;
import mongoose from 'mongoose';

const cardTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageBase64: { type: String, required: true },  // Store Base64 string here
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('CardTemplate', cardTemplateSchema);

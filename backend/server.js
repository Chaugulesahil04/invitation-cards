import express from 'express';
import connectDB from './config/db.js';
import multer from 'multer';
import fs from 'fs';
import CardTemplate from './models/CardTemplate.js';

const app = express();
connectDB(); // Connect to MongoDB

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage }); // Use memory storage to avoid local file storage

// POST request to handle file upload and store as Base64 in MongoDB
app.post('/invitation/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imageBase64 = req.file.buffer.toString('base64'); // Convert file buffer to base64 string
        const newTemplate = new CardTemplate({
            name: req.body.name,
            imageBase64,
        });

        await newTemplate.save();
        res.status(200).json({ message: 'Template uploaded and saved to MongoDB successfully!' });
    } catch (error) {
        console.error('Error uploading template:', error);
        res.status(500).json({ error: 'Failed to upload and save template' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Hardcoded MongoDB URI
        const mongoURI = 'mongodb+srv://sahilchougule301:sahil004@cluster0.hu7rs.mongodb.net/'; // Replace this with your MongoDB URI
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;

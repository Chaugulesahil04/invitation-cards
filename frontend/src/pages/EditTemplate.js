import React, { useState } from 'react';
import axios from 'axios';

function EditTemplate() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleUpload = async () => {
        if (!name || !image) {
            alert('Please provide a template name and select an image');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);  // Must match `upload.single('image')` on backend

        try {
            const response = await axios.post('http://localhost:5000/invitation/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error uploading template:', error);
            alert('Failed to upload template');
        }
    };

    return (
        <div>
            <h2>Upload a New Template</h2>
            <input
                type="text"
                placeholder="Template Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default EditTemplate;

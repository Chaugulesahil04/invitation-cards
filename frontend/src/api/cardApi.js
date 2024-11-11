// cardApi.js

import axios from 'axios';

const API_URL = '/api/cards';

// Fetch all card templates from the backend
export const getCardTemplates = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching card templates:', error);
        throw error;
    }
};

// Upload a new card template to the backend
export const uploadCardTemplate = async (templateData) => {
    try {
        const formData = new FormData();
        formData.append('name', templateData.name);
        formData.append('image', templateData.image);

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading card template:', error);
        throw error;
    }
};

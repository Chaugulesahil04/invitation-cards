// SeeTemplates.js

import React, { useEffect, useRef, useState } from 'react';
import { getCardTemplates } from '../api/cardApi';
import html2canvas from 'html2canvas';
import './SeeTemplates.css';

const SeeTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [textData, setTextData] = useState({
        name: '',
        venue: '',
        date: ''
    });

    const canvasRef = useRef(null);

    // Fetch card templates when the component mounts
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getCardTemplates();
                setTemplates(data);
            } catch (error) {
                console.error('Error fetching card templates:', error);
            }
        };
        fetchTemplates();
    }, []);

    // Load selected template onto the canvas
    const loadTemplate = (template) => {
        setSelectedTemplate(template);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.src = `data:image/png;base64,${template.image}`;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            drawText(ctx);
        };
    };

    // Draw text on canvas (name, venue, date)
    const drawText = (ctx) => {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous drawing
        const img = new Image();
        img.src = `data:image/png;base64,${selectedTemplate.image}`;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            ctx.fillText(textData.name, 100, 100); // Adjust position as needed
            ctx.fillText(textData.venue, 100, 150);
            ctx.fillText(textData.date, 100, 200);
        };
    };

    // Handle text input change
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setTextData({
            ...textData,
            [name]: value
        });
    };

    // Download the canvas as PNG or JPEG
    const downloadTemplate = (format) => {
        const canvas = canvasRef.current;
        const imageUrl = canvas.toDataURL(`image/${format}`);
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `template.${format}`;
        a.click();
    };

    return (
        <div className="templates-container">
            <h2>See and Edit Templates</h2>
            <div className="template-list">
                {templates.map((template) => (
                    <div key={template._id} className="template-card">
                        <h3>{template.name}</h3>
                        <button onClick={() => loadTemplate(template)}>Edit Template</button>
                    </div>
                ))}
            </div>

            {selectedTemplate && (
                <div className="edit-canvas-container">
                    <canvas ref={canvasRef}></canvas>
                    <div className="text-inputs">
                        <input
                            type="text"
                            name="name"
                            placeholder="Edit Name"
                            value={textData.name}
                            onChange={handleTextChange}
                        />
                        <input
                            type="text"
                            name="venue"
                            placeholder="Edit Venue"
                            value={textData.venue}
                            onChange={handleTextChange}
                        />
                        <input
                            type="text"
                            name="date"
                            placeholder="Edit Date"
                            value={textData.date}
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className="download-buttons">
                        <button onClick={() => downloadTemplate('png')}>Download PNG</button>
                        <button onClick={() => downloadTemplate('jpeg')}>Download JPEG</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeeTemplates;

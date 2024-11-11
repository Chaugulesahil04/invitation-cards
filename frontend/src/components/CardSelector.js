import React from 'react';

function CardSelector({ templates, onSelect, selectedTemplate }) {
    if (!templates || templates.length === 0) {
        return <p>No templates available.</p>;
    }

    return (
        <div className="card-selector">
            {templates.map((template) => (
                <div 
                    key={template._id} 
                    className={`card-option ${selectedTemplate?._id === template._id ? 'selected' : ''}`}
                    onClick={() => onSelect(template)}
                >
                    <img src={template.imageURL} alt={template.templateName} />
                    <p>{template.templateName}</p>
                </div>
            ))}
        </div>
    );
}

export default CardSelector;

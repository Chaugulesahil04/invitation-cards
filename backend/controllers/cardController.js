const CardTemplate = require('../models/CardTemplate');

exports.getTemplates = async (req, res) => {
  try {
    const templates = await CardTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadTemplate = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.buffer.toString('base64');
    const newTemplate = new CardTemplate({ name, image });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

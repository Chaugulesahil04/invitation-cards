const express = require('express');
const router = express.Router();
const { getTemplates, uploadTemplate } = require('../controllers/cardController');
const upload = require('../middleware/fileUpload');

router.get('/', getTemplates);
router.post('/', upload.single('image'), uploadTemplate);

module.exports = router;

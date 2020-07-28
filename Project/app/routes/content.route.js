const {Router} = require('express');
const content_controller = require('../controllers/content.controller.js');
const content_router = Router();

content_router.get('/', content_controller.getContent);
content_router.get('/:id', content_controller.getProduct);

module.exports = content_router
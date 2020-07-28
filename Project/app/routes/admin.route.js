const {Router} = require('express');
const admin_controller = require('../controllers/admin.controller.js');
const admin_router = Router();

admin_router.get('/', (req,res)=>{
    res.render('admin');
});

module.exports = admin_router;
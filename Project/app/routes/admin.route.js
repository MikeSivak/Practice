const {Router} = require('express');
const admin_controller = require('../controllers/admin.controller.js');
const admin_router = Router();

// admin_router.get('/', (req,res)=>{
//     res.render('admin');
// });

admin_router.get('/', admin_controller.getCars);
admin_router.post('/add', admin_controller.addProduct);
admin_router.post('/delete', admin_controller.deleteProduct);

module.exports = admin_router;
const { current_orders, car } = require("../models")


exports.saleProduct = (req,res) =>{
    let id_order = req.body.id;
    let id_product = req.body.id_product;
    let car_quantity = req.body.quant;

    car_quantity--;
    
    if(car_quantity <= 0){
        car_quantity = 0;
    }

    try{
        car
        .update({
            quantity: car_quantity
        },
            {
                where:{
                    id: id_product
                }
            }
        )
        .then(
            res.redirect('http://localhost:5000/admin')
        )
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }

    try{
        current_orders
        .destroy(
            {
                where:{
                    id: id_order
                }
            }
        )
        .then(
            res.redirect('http://localhost:5000/admin')
        )
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}
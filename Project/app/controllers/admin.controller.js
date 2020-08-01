const db = require('../models');
const car = db.car;
const car_country = db.car_country;
const car_cylinders = db.car_cylinders;
const car_brand = db.car_brand;
const car_model = db.car_model;
const car_body = db.car_body;
const car_fuel = db.car_fuel;
const car_drive = db.car_drive;
const engine_type = db.engine_type;
const engine_volume = db.engine_volume;
const fuel_index = db.fuel_index;
const users = db.users;
const roles = db.roles;
const current_orders = db.current_orders;

users.hasMany(current_orders, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});
current_orders.belongsTo(users, {
    foreignKey: 'id_user'
});

car.hasMany(current_orders, {
    foreignKey: 'id_car',
    sourceKey: 'id'
});
current_orders.belongsTo(car, {
    foreignKey: 'id_car'
});

roles.hasMany(users, {
    foreignKey: 'id_role',
    sourceKey: 'id'
});
users.belongsTo(roles, {
    foreignKey: 'id_role'
});

car_cylinders.hasMany(car, {
    foreignKey: 'id_cylinders',
    sourceKey: 'id'
});
car.belongsTo(car_cylinders, {
    foreignKey: 'id_cylinders'
});

car_brand.hasMany(car_model, {
    foreignKey: 'id_brand',
    sourceKey: 'id'
});
car_model.belongsTo(car_brand, {
    foreignKey: 'id_brand'
});

car_model.hasMany(car, {
    foreignKey: 'id_model',
    sourceKey: 'id'
});
car.belongsTo(car_model, {
    foreignKey: 'id_model'
});

car_body.hasMany(car, {
    foreignKey: 'id_body',
    sourceKey: 'id'
});
car.belongsTo(car_body, {
    foreignKey: 'id_body'
});

car_fuel.hasMany(car, {
    foreignKey: 'id_fuel',
    sourceKey: 'id'
});
car.belongsTo(car_fuel, {
    foreignKey: 'id_fuel'
});

car_drive.hasMany(car, {
    foreignKey: 'id_drive',
    sourceKey: 'id'
});
car.belongsTo(car_drive, {
    foreignKey: 'id_drive'
});

engine_type.hasMany(car, {
    foreignKey: 'id_engine_type',
    sourceKey: 'id'
});
car.belongsTo(engine_type, {
    foreignKey: 'id_engine_type'
});

engine_volume.hasMany(car, {
    foreignKey: 'id_engine_volume',
    sourceKey: 'id'
});
car.belongsTo(engine_volume, {
    foreignKey: 'id_engine_volume'
});

car_country.hasMany(car_brand, {
    foreignKey: 'id_country',
    sourceKey: 'id'
});
car_brand.belongsTo(car_country, {
    foreignKey: 'id_country'
});

fuel_index.hasMany(car, {
    foreignKey: 'id_fuel_index',
    sourceKey: 'id'
});
car.belongsTo(fuel_index, {
    foreignKey: 'id_fuel_index'
});

exports.getCars = async (req, res) => {

    const brands = await car_brand
        .findAll({ raw: true });
    const models = await car_model
        .findAll({ raw: true });
    const bodies = await car_body
        .findAll({ raw: true });
    const fuels = await car_fuel
        .findAll({ raw: true });
    const drives = await car_drive
        .findAll({ raw: true });
    const cylinders = await car_cylinders
        .findAll({ raw: true });
    const engine_types = await engine_type
        .findAll({ raw: true });
    const engine_volumes = await engine_volume
        .findAll({ raw: true });
    const fuel_indices = await fuel_index
        .findAll({ raw: true });

        const users_list = await users
        .findAll({
            include: [
                { model: roles }
            ],
            raw: true
        });

        const order_list = await current_orders
        .findAll({
            include: [
                {model: users},
                {model: car, include: [{model: car_model, include: car_brand}]}
            ],
            raw:true
        });

        console.log('========================================================');
        console.log(order_list);
        console.log('========================================================');

    try {
        await car
            .findAll({
                include: [
                    { model: car_cylinders },
                    { model: car_model, include: car_brand },
                    { model: car_model, include: [{ model: car_brand, include: car_country }] },
                    { model: car_body },
                    { model: car_fuel },
                    { model: car_drive },
                    { model: engine_type },
                    { model: engine_volume },
                    { model: fuel_index }
                ],
                raw: true
            }
            ).then(cars => {
                res.render('admin', {
                    cars: cars,
                    brands: brands,
                    models: models,
                    bodies: bodies,
                    fuels: fuels,
                    drives: drives,
                    cylinders: cylinders,
                    engine_types: engine_types,
                    engine_volumes: engine_volumes,
                    fuel_indices: fuel_indices,
                    users_list: users_list,
                    order_list: order_list
                });
                console.log(cars);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.addProduct = async (req, res) => {
    // let brand_name = req.bowdy.sBrand;
    let model_name = req.body.sModel;
    let body_name = req.body.sBody;
    let fuel_name = req.body.sFuel;
    let drive_name = req.body.sDrive;
    let cylinders_marking = req.body.sCylindersMarkking;
    let engine_type_name = req.body.sEngineType;
    let engine_vol = req.body.sEngineVolume;
    let picture_link = req.body.txt;
    let price = req.body.ePrice;
    let year = req.body.eYear;
    let descript = req.body.wDescription;
    let index_name = req.body.sFuelIndex;
    let hp = req.body.eHp;
    let quant = req.body.quantity;

    // const brand = await car_brand
    //     .findOne({ where: { brand_name: brand_name }, raw: true })
    // id_brand = brand.id;

    const model = await car_model
        .findOne({ where: { model_name: model_name }, raw: true })
    id_model = model.id;

    const body = await car_body
        .findOne({ where: { body_name: body_name }, raw: true })
    id_body = body.id;

    const fuel = await car_fuel
        .findOne({ where: { fuel_name: fuel_name }, raw: true })
    id_fuel = fuel.id;

    const drive = await car_drive
        .findOne({ where: { drive_name: drive_name }, raw: true })
    id_drive = drive.id;

    const cylinders = await car_cylinders
        .findOne({ where: { cylinders_marking: cylinders_marking }, raw: true })
    id_cylinder = cylinders.id;

    const e_type = await engine_type
        .findOne({ where: { engine_type_name: engine_type_name }, raw: true })
    id_e_type = e_type.id;

    const e_volume = await engine_volume
        .findOne({ where: { volume: engine_vol }, raw: true })
    id_e_volume = e_volume.id;

    const f_index = await fuel_index
        .findOne({ where: { index_name: index_name }, raw: true })
    id_f_index = f_index.id

    try {
        car
            .create({
                id_model: id_model,
                id_body: id_body,
                id_fuel: id_fuel,
                id_drive: id_drive,
                id_cylinders: id_cylinder,
                id_engine_type: id_e_type,
                id_engine_volume: id_e_volume,
                picture_link: picture_link,
                price: price,
                years: year,
                descript: descript,
                id_fuel_index: id_f_index,
                hp: hp,
                quantity: quant
            })
            .then(
                res.redirect('http://localhost:5000/admin')
            )
    }
    catch (e) {
        res.status(500).json({
            mesage: 'Something went wrong, try again: ' + e.mesage
        })
    }
}

exports.deleteProduct = (req,res) =>{
    let id_product = req.body.id

    try{
        car
        .destroy(
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
}
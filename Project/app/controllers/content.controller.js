const db = require('../models');
// const { car_brand } = require('../models');
const car = db.car;
const car_country = db.car_country;
const car_cylinders = db.car_cylinders;
const car_brand = db.car_brand;
const car_model = db.car_model;
const car_body = db.car_body;
const car_fuel = db.car_fuel;
const car_drive = db.car_drive;
const engime_type = db.engine_type;
const engine_volume = db.engine_volume;

car_cylinders.hasMany(car, {
    foreignKey:'id_cylinders',
    sourceKey:'id'
});
car.belongsTo(car_cylinders, {
    foreignKey:'id_cylinders'
});

car_brand.hasMany(car_model, {
    foreignKey:'id_brand',
    sourceKey:'id'
});
car_model.belongsTo(car_brand, {
    foreignKey:'id_brand'
});

car_model.hasMany(car, {
    foreignKey:'id_model',
    sourceKey:'id'
});
car.belongsTo(car_model, {
    foreignKey:'id_model'
});

car_body.hasMany(car, {
    foreignKey:'id_body',
    sourceKey:'id'
});
car.belongsTo(car_body, {
    foreignKey:'id_body'
});

car_fuel.hasMany(car, {
    foreignKey:'id_fuel',
    sourceKey:'id'
});
car.belongsTo(car_fuel, {
    foreignKey:'id_fuel'
});

car_drive.hasMany(car, {
    foreignKey:'id_drive',
    sourceKey:'id'
});
car.belongsTo(car_drive, {
    foreignKey:'id_drive'
});

engime_type.hasMany(car, {
    foreignKey:'id_engine_type',
    sourceKey:'id'
});
car.belongsTo(engime_type, {
    foreignKey:'id_engine_type'
});

engine_volume.hasMany(car, {
    foreignKey:'id_engine_volume',
    sourceKey:'id'
});
car.belongsTo(engine_volume, {
    foreignKey:'id_engine_volume'
});

exports.getContent = async (req, res) => {

    try {
        await car
            .findAll({
                include: [
                    { model: car_cylinders },
                    { model: car_model, include: car_brand},
                    {model: car_body},
                    {model: car_fuel},
                    {model: car_drive},
                    {model: engime_type},
                    {model: engine_volume}
                ], raw: true
            }
            ).then(content => {
                res.render('content', {
                    content: content
                });
                    console.log(content);
            });
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        await car
            .findAll({
                where: { id: req.params.id },
                include: [
                    { model: car_cylinders },
                    { model: car_model, include: car_brand},
                    {model: car_body},
                    {model: car_fuel},
                    {model: car_drive},
                    {model: engime_type},
                    {model: engine_volume}
                ],
                raw: true
            }
            ).then(content => {
                res.render('product', {
                    content: content,
                });
                console.log(content);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

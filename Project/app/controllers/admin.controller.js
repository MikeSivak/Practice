const db = require('../models');
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
const fuel_index = db.fuel_index;

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

engime_type.hasMany(car, {
    foreignKey: 'id_engine_type',
    sourceKey: 'id'
});
car.belongsTo(engime_type, {
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
        .findAll({raw:true});
    const drives= await car_drive
        .findAll({raw:true});
    const cylinders = await car_cylinders
        .findAll({raw:true});
    const engine_types = await engime_type
        .findAll({raw:true});
    const engine_volumes = await engine_volume
        .findAll({raw:true});   
    const fuel_indices = await fuel_index
        .findAll({raw:true});

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
                    { model: engime_type },
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
                    fuel_indices: fuel_indices
                });
                console.log(cars);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}
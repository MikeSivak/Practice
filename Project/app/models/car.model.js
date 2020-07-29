const db = require('../models');
const car_model = db.car_model;
const car_body = db.car_body;
const car_fuel = db.car_fuel;
const car_drive = db.car_drive;
const car_cylinders = db.car_cylinders;
const engine_volume = db.engine_volume;
const engine_type = db.engine_type

module.exports = (sequelize, Sequelize) => {
    const car = sequelize.define("car", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_model: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_model,
            referencesKey: 'id',
            field: 'id_model'
        },
        id_body: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_body,
            referencesKey: 'id',
            field: 'id_body'
        },
        id_fuel: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_fuel,
            referencesKey: 'id',
            field: 'id_fuel'
        },
        id_drive: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_drive,
            referencesKey: 'id',
            field: 'id_drive'
        },
        id_cylinders: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_cylinders,
            referencesKey: 'id',
            field: 'id_cylinders'
        },
        id_engine_volume: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: engine_volume,
            referencesKey: 'id',
            field: 'id_engine_volume'
        },
        id_engine_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: engine_type,
            referencesKey: 'id',
            field: 'id_engine_type'
        },
        picture_link: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'picture_link'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'price'
        },
        years: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'years'
        },
        descript: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'descript'
        },
        id_fuel_index: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_fuel_index'
        },
        hp: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'hp'
        },
        quantity: {
            type:Sequelize.INTEGER,
            allowNull: false,
            field: 'quantity'
        }
    },{
        modelName: 'car',
        tableName: 'car',
        timestamps: false
    });
    
    return car;
}
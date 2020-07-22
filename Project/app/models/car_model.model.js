const db = require('../models');
const car_brand = db.car_brand;

module.exports = (sequelize, Sequelize) => {
    const car_model = sequelize.define("car_model", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_brand: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_brand,
            referencesKey: 'id',
            field: 'id_brand'
        },
        model_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'model_name'
        }
    },{
        modelName: 'car_model',
        tableName: 'car_model',
        timestamps: false
    });
    
    return car_model;
}
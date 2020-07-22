const db = require('../models');
const car_country = db.car_country;

module.exports = (sequelize, Sequelize) => {
    const car_brand = sequelize.define("car_brand", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_country: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car_country,
            referencesKey: 'id',
            field: 'id_country'
        },
        brand_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'brand_name'
        }
    },{
        modelName: 'car_brand',
        tableName: 'car_brand',
        timestamps: false
    });
    
    return car_brand;
}
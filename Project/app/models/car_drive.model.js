const db = require('../models');
const car_country = db.car_country;

module.exports = (sequelize, Sequelize) => {
    const car_drive = sequelize.define("car_drive", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        drive_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'drive_name'
        }
    },{
        modelName: 'car_drive',
        tableName: 'car_drive',
        timestamps: false
    });
    
    return car_drive;
}
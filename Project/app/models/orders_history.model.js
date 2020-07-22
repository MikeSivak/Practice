const db = require('../models');
const car = db.car;
const users = db.users;

module.exports = (sequelize, Sequelize) => {
    const orders_history = sequelize.define("orders_history", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_car: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: car,
            referencesKey: 'id',
            field: 'id_car'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: users,
            referencesKey: 'id',
            field: 'id_user'
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'order_date'
        }
    },{
        modelName: 'orders_history',
        tableName: 'orders_history',
        timestamps: false
    });
    
    return orders_history;
}
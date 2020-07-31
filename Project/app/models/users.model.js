const db = require('../models');
const roles = db.roles;

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        user_login: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_login'
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_password'
        },
        user_phone: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_phone'
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: roles,
            referencesKey: 'id',
            field: 'id_role'
        }
        
    },{
        modelName: 'users',
        tableName: 'users',
        timestamps: false
    });

    return users;
}
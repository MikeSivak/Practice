module.exports = (sequelize, Sequelize) => {
    const car_cylinders = sequelize.define("car_cylinders", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        cylinders_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'cylinders_count'
        },
        cylinders_marking: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'cylinders_marking'
        }
    },{
        modelName: 'car_cylinders',
        tableName: 'car_cylinders',
        timestamps: false
    });
    
    return car_cylinders;
}
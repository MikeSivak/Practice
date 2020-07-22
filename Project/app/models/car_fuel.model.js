module.exports = (sequelize, Sequelize) => {
    const car_fuel = sequelize.define("car_fuel", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        fuel_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'fuel_name'
        },
        id_engine_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_engine_type'
        }
    },{
        modelName: 'car_fuel',
        tableName: 'car_fuel',
        timestamps: false
    });
    
    return car_fuel;
}
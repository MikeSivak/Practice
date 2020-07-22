module.exports = (sequelize, Sequelize) => {
    const car_country = sequelize.define("car_country", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        country_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'country_name'
        }
    },{
        modelName: 'car_country',
        tableName: 'car_country',
        timestamps: false
    });
    
    return car_country;
}
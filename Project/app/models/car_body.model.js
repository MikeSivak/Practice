module.exports = (sequelize, Sequelize) => {
    const car_body = sequelize.define("car_body", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        body_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'body_name'
        }
    },{
        modelName: 'car_body',
        tableName: 'car_body',
        timestamps: false
    });
    
    return car_body;
}
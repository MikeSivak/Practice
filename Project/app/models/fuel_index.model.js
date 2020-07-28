module.exports = (sequelize, Sequelize) => {
    const fuel_index = sequelize.define("fuel_index", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        index_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'index_name'
        },
    },{
        modelName: 'fuel_index',
        tableName: 'fuel_index',
        timestamps: false
    });
    
    return fuel_index;
}
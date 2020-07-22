module.exports = (sequelize, Sequelize) => {
    const engine_volume = sequelize.define("engine_volume", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        volume: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'volume'
        }
    },{
        modelName: 'engine_volume',
        tableName: 'engine_volume',
        timestamps: false
    });
    
    return engine_volume;
}
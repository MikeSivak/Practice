module.exports = (sequelize, Sequelize) => {
    const engine_type = sequelize.define("engine_type", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        engine_type_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'engine_type_name'
        },
    },{
        modelName: 'engine_type',
        tableName: 'engine_type',
        timestamps: false
    });
    
    return engine_type;
}
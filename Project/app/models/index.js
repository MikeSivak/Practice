const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car_body = require('./car_body.model.js')(sequelize, Sequelize);
db.car_brand = require('./car_brand.model.js')(sequelize, Sequelize);
db.car_country = require('./car_country.model.js')(sequelize, Sequelize);
db.car_cylinders = require('./car_cylinders.model.js')(sequelize, Sequelize);
db.car_drive = require('./car_drive.model.js')(sequelize, Sequelize);
db.car_fuel = require('./car_fuel.model.js')(sequelize, Sequelize);
db.car_model = require('./car_model.model.js')(sequelize, Sequelize);
db.current_orders = require('./current_orders.model.js')(sequelize, Sequelize);
db.engine_type = require('./engine_type.model.js')(sequelize, Sequelize);
db.engine_volume = require('./engine_volume.model.js')(sequelize, Sequelize);
db.orders_history = require('./orders_history.model.js')(sequelize, Sequelize);
db.car = require('./car.model.js')(sequelize, Sequelize);
db.roles = require('./roles.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);

module.exports = db;
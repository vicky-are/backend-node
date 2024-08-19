require('dotenv').config();
const dbConfig = require("../orgConfig/orgDb.config.js").databaseAuth();
// const db = require("../../models")

const Sequelize = require("sequelize");
  const sequelize = new Sequelize(
    dbConfig.DB_DATABASE,
    dbConfig.DB_USER,
    dbConfig.DB_PASS, {
    host: dbConfig.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  );

const db2 = {};

db2.Sequelize = Sequelize;
db2.sequelize = sequelize;

db2.user = require("./orgUser.model.js")(sequelize, Sequelize);
db2.leads = require("./orgLeads.model.js")(sequelize, Sequelize);
db2.roles = require("./orgRoles.model.js")(sequelize, Sequelize);
db2.rolesPermissions = require("./orgRolesPermissions.model.js")(sequelize, Sequelize);
db2.chatConversation = require("./chatConversation.model.js")(sequelize, Sequelize);

module.exports = db2;
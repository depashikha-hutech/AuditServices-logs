let Sequelize = require("sequelize");
require("dotenv")?.config();
const env = process?.env
const sequelize = new Sequelize(
  env.DBNAME,
  env.DBUSERNAME,
  env.DBPASSWORD,
  {
    host: env.DBHOST,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    reconnect: {
      max_retries: 5,
      onRetry: function (count) {
        console.log("connection lost, trying to reconnect (" + count + ")");
      },
    },
    pool: {
      max: 5,
      min: 0,
    },
  }
);
const db = {
  sequelize,
  Sequelize,
  AduitService: require("../models/service")(sequelize,Sequelize),
}
 
  module.exports = db;

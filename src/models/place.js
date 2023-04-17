const { Sequelize } = require("sequelize");
const connection = require("../database");
const User = require("./user");

const Place = connection.define("Place", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  openingHours: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
});

Place.belongsTo(User);

module.exports = Place;

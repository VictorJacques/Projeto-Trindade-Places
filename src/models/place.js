const { Sequelize } = require("sequelize");
const connection = require("../database");
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

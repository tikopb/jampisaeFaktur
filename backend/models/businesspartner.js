'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class businesspartner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  businesspartner.init({
    businesspartner_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    value: {
      DataTypes.TEXT,
      unique: true
    },
    description: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    DnNominal: DataTypes.INTEGER,
    CnNominal: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'businesspartner',
  });
  return businesspartner;
};
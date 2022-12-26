'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment.init({
    payments_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    paymentNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    businesspartner_id: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER,
    grandTotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};
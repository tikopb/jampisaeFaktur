'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
    invoice_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fakturno: DataTypes.STRING,
    description: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    businesspartner_id: DataTypes.INTEGER,
    dueDate: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    grandTotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};

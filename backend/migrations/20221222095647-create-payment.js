'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      payments_id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentNo: {
        type: Sequelize.STRING
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      businesspartner_id: {
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER
      },
      grandTotal: {
        type: Sequelize.INTEGER
      }
    }),
    //adding constaint
     await queryInterface.addConstraint(
      'payments',{
        fields: ['createdBy'],
        type: 'foreign key',
        name: 'payC_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
    await queryInterface.addConstraint(
      'payments',{
        fields: ['updatedBy'],
        type: 'foreign key',
        name: 'payU_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    ),
    await queryInterface.addConstraint(
      'payments',{
        fields: ['businesspartner_id'],
        type: 'foreign key',
        name: 'payment_bp_const',
        references: { //Required field
          table: 'businesspartners',
          field: 'businesspartner_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
    ;
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
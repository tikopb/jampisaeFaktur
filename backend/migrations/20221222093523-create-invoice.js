'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      invoice_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fakturno: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
      dueDate: {
        type: Sequelize.INTEGER
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      grandTotal: {
        type: Sequelize.INTEGER
      }
    }),
    //adding constaint
     await queryInterface.addConstraint(
      'invoices',{
        fields: ['createdBy'],
        type: 'foreign key',
        name: 'invC_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
    await queryInterface.addConstraint(
      'invoices',{
        fields: ['updatedBy'],
        type: 'foreign key',
        name: 'invU_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    ),
    await queryInterface.addConstraint(
      'invoices',{
        fields: ['businesspartner_id'],
        type: 'foreign key',
        name: 'invoice_bp_const',
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
    await queryInterface.dropTable('invoices');
  }
};
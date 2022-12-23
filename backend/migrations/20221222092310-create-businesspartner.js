'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('businesspartners', {
      businesspartner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING,
        unique: true
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
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      DnNominal: {
        type: Sequelize.INTEGER
      },
      CnNominal: {
        type: Sequelize.INTEGER
      }
    }),
    //adding constaint
    await queryInterface.addConstraint(
      'businesspartners',{
        fields: ['createdBy'],
        type: 'foreign key',
        name: 'bpC_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
     //adding constaint
     await queryInterface.addConstraint(
      'businesspartners',{
        fields: ['updatedBy'],
        type: 'foreign key',
        name: 'bpU_user_const',
        references: { //Required field
          table: 'users',
          field: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
    ;
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('businesspartners');
  }
};
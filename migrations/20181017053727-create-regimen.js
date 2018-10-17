'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('regimens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      session_length: {
        type: Sequelize.STRING
      },
      schedule: {
        type: Sequelize.STRING
      },
      organization: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      privacy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('regimens');
  }
};
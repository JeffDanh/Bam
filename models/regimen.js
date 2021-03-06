'use strict';
module.exports = (sequelize, DataTypes) => {
  const regimen = sequelize.define('regimen', {
    userId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    session_length: DataTypes.STRING,
    schedule: DataTypes.STRING,
    organization: DataTypes.STRING,
    description: DataTypes.STRING,
    note: DataTypes.STRING,
    privacy: DataTypes.STRING
  }, {});
  regimen.associate = function(models) {
    // associations can be defined here
    regimen.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return regimen;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lab = sequelize.define('Lab', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    test_id: DataTypes.INTEGER
  }, {});
  Lab.associate = function(models) {
    // associations can be defined here
  };
  return Lab;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_number: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    models.Group.hasMany(models.Student);
  };
  return Group;
};
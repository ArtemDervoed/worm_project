'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupSubject = sequelize.define('GroupSubject', {
    group_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {});
  GroupSubject.associate = function(models) {
    // associations can be defined here
  };
  return GroupSubject;
};
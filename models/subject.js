'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Subject.associate = function(models) {
    models.Subject.belongsToMany(models.Group, { through: models.GroupSubject, foreignKey: 'subject_id' })
  };
  return Subject;
};
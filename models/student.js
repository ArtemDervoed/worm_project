'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    doc_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    models.Student.belongsTo(models.Group, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Student;
};
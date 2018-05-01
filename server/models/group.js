'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    description: DataTypes.STRING,
    creatorid: DataTypes.INTEGER,
  }, {});
  Group.associate = function(models) {
    // associations can be defined here

    Group.belongsToMany(models.User, {
       through: 'groupuser',
       foreignKey: 'groupid',
    });
    // Group.belongsTo(models.GroupUser, {
    //   foreignKey: 'userid',
    //   });
    Group.hasMany(models.Message, {
           foreignKey: 'groupid',
    })
  };
  return Group;
};
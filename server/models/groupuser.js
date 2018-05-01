'use strict';
module.exports = (sequelize, DataTypes) => {
  var GroupUser = sequelize.define('GroupUser', {
    groupid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    userstatus: DataTypes.STRING
  }, {});
  GroupUser.associate = function(models) {
    // associations can be defined here
  };
  return GroupUser;
};
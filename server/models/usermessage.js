'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserMessage = sequelize.define('UserMessage', {
    groupid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    Messageid: DataTypes.INTEGER
  }, {});
  UserMessage.associate = function(models) {
    // associations can be defined here
  };
  return UserMessage;
};
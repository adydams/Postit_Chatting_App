'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    messagecontent: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here

    Message.belongsTo(models.User, {
      as: 'Author',
      onDelete: 'SET NULL'
    });
  };
  return Message;
};
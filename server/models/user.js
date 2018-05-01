const bcrypt = require('bcrypt');


'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    hooks:{
        beforeCreate(user) {
       return bcrypt.hash(user.password, 10)
        .then((hashedPassword)=> {
          // Store hash in your password DB.
           user.password = hashedPassword ;
          return user.password;
        });
      },

       beforeUpdate(user) {
        {
       return bcrypt.hash(user.password, 10)
        .then((hashedPassword)=> {
          // Store hash in your password DB.
           user.password = hashedPassword ;
          return user.password;
        });
       }
      }
     } 
  } );
  User.associate = function(models) {
    // associations can be defined here

    User.belongsToMany(models.Group, {
       through: {
         model: 'groupuser'
       },
         foreignKey: 'userid',
         otherKey: 'groupid'   
    });
      
  };
  User.prototype.verifyPassword = function(password){
        return bcrypt.compare(password, this.password)
        .then((result)=>{
           console.log(')))))(((((', result)
           console.log(')))))(((((', password)
           console.log(')))))(((((', this.password)
          return result;
        });
      },

      User.prototype.echoUsername = function(password){
        
          console.log(this.username);
        }

  
    return User;
};

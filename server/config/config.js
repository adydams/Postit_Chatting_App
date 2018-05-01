require('dotenv').config();

const {
  DB_USERNAME,
  password,
  database,
  host
} = process.env;

  module.exports = {
  development: {
    password,
    database,
    host,
    username: DB_USERNAME,
    dialect: 'postgres'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

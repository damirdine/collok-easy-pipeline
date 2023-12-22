export default {
  development: {
    username: "collokeasy",
    password: "password",
    database: "collokeasy",
    models: "./models/*.js",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "collokeasy",
    password: "password",
    database: "collokeasy",
    models: "./models/*.js",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

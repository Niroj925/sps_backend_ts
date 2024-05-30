"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require('dotenv').config();
// Configuration object for the database connection
const dbConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [
        "src/entity/entity.ts"
    ],
    logging: false,
    synchronize: true,
    subscribers: [],
    migrations: []
};
// Create a new instance of the DataSource using the configuration
exports.AppDataSource = new typeorm_1.DataSource(dbConfig);

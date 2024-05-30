import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();
// Configuration object for the database connection
const dbConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [
        "src/entity/entity.ts"
    ],
    logging: false,
    synchronize: true,
    subscribers: [],
    migrations: []
} as DataSourceOptions;

// Create a new instance of the DataSource using the configuration
export const AppDataSource = new DataSource(dbConfig);

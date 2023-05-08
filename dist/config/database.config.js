"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const environments_config_1 = __importDefault(require("./environments.config"));
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: environments_config_1.default.dbHost,
    port: Number(environments_config_1.default.dbPort),
    username: environments_config_1.default.dbUserName,
    password: environments_config_1.default.dbPassword,
    database: environments_config_1.default.database,
    synchronize: false,
    logging: true,
    migrationsRun: true,
    entities: ['./src/modules/**/models/entities/*.ts'],
    migrations: ['./src/shared/migrations/*.ts'],
    applicationName: environments_config_1.default.databaseAppName,
});
(async () => {
    try {
        await AppDataSource.initialize();
        console.log('Connected to database');
    }
    catch (err) {
        console.error('Something went wrong when connecting to the database:\n', err.stack);
    }
})();
exports.default = AppDataSource;

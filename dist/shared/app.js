"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const corsOptions_1 = __importDefault(require("../shared/middlewares/corsOptions"));
const helmet_1 = __importDefault(require("helmet"));
const morganConfig_1 = __importDefault(require("./middlewares/morganConfig"));
require("express-async-errors");
const environments_config_1 = __importDefault(require("../config/environments.config"));
const errorHandler_1 = __importDefault(require("../shared/middlewares/errorHandler"));
const rateLimiter_1 = __importDefault(require("../shared/middlewares/rateLimiter"));
const routes_1 = __importDefault(require("./routes"));
const Redis_1 = __importDefault(require("../shared/services/Redis"));
const AppSuccess_1 = __importDefault(require("./utils/AppSuccess"));
const Logger_1 = require("../shared/utils/Logger");
const chalk_1 = __importDefault(require("chalk"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        require('../config/database.config');
        new Redis_1.default();
        this.app.use(morganConfig_1.default);
        this.app.use(Logger_1.morganMiddleware);
        this.app.use(corsOptions_1.default);
        this.app.options('*', corsOptions_1.default);
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(rateLimiter_1.default);
        this.setRoutes();
        this.app.use((response, req, res, next) => {
            if (response instanceof AppSuccess_1.default) {
                return res.status(response.statusCode).json(response.data);
            }
            next(response);
        });
        this.app.use(errorHandler_1.default);
        this.app.use((request, response) => {
            return response.status(404).json({
                success: true,
                message: 'Endpoint not found.',
            });
        });
    }
    setRoutes() {
        this.app.get('/', (request, response) => {
            response.status(200).json({
                success: true,
                message: 'Welcome To Quick Pay',
            });
        });
        this.app.use('/api/v1', routes_1.default);
    }
    getApp() {
        return this.app;
    }
    listen() {
        const { port } = environments_config_1.default;
        this.app.listen(port, () => {
            console.log(`${chalk_1.default.green.bold('✓')} 👍 Server running on ${chalk_1.default.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk_1.default.yellow.blue(port)}`);
            Logger_1.systemLogs.info(`Server running on ${process.env.NODE_ENV} mode on port ${port}`);
        });
    }
}
exports.default = App;

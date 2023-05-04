"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
exports.default = {
    port: process.env.PORT || '',
    nodeEnv: process.env.NODE_ENV || '',
    dbHost: process.env.DB_HOST || '',
    dbType: process.env.DB_TYPE || '',
    dbPort: process.env.DB_PORT || '',
    dbUserName: process.env.DB_USERNAME || '',
    dbPassword: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    databaseAppName: process.env.DB_APPLICATION_NAME || '',
    redisHost: process.env.REDIS_HOST || '127.0.0.1',
    redisPort: process.env.REDIS_PORT || '6379',
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
    sendInBlueApiKey: process.env.SENDINBLUE_API_KEY || '',
    saltRounds: process.env.SALT_ROUNDS || 10,
    otpExpiresin: Number(process.env.OTP_EXPIRES_IN) || 60
};

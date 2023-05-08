"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
class Cache {
    constructor() {
        this.client = new ioredis_1.default({
            host: environments_config_1.default.redisHost,
            port: parseInt(environments_config_1.default.redisPort),
        });
        this.client.on('connect', () => {
            console.log('Redis connected');
        });
        this.client.on('ready', () => {
            console.log('Redis ready for connection');
        });
        this.client.on('end', () => {
            console.log('Redis connection ended');
        });
        this.client.on('error', (error) => {
            console.log('Redis Error', error);
        });
        this.client.on('SIGINT', () => {
            console.log('SIGINT ERR');
        });
    }
    set(key, value, expiry = 3600) {
        this.client.set(key, JSON.stringify(value), 'EX', expiry);
    }
    async get(key) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }
    delete(key) {
        this.client.del(key);
    }
}
exports.default = new Cache();

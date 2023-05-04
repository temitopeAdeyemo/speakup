"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
class Bcrypt {
    constructor() {
        this.saltRounds = environments_config_1.default.saltRounds;
    }
    async hash(data) {
        const hashedData = await bcryptjs_1.default.hash(data, this.saltRounds);
        return hashedData;
    }
    async compare(data, hashedData) {
        const comparedData = await bcryptjs_1.default.compare(data, hashedData);
        return comparedData;
    }
}
exports.default = Bcrypt;

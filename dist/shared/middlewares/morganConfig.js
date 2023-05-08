"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
exports.default = (0, morgan_1.default)('short', {
    skip: (request, response) => environments_config_1.default.nodeEnv === 'test',
});

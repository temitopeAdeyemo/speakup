"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class AuthUserService extends BaseService_1.default {
    async execute(data) {
        this.checkPassword;
        const user = await this.getUser('email', data.email);
        await this.checkPassword(data.password, user.password);
        await this.throwCredNotVerified('email', user);
        const accessToken = this.jwtClient.generateAccessToken({ id: user.id });
        return { access_token: accessToken };
    }
}
exports.default = AuthUserService;

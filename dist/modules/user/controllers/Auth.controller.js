"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const baseController_1 = __importDefault(require("./baseController"));
class AuthUser extends baseController_1.default {
    constructor() {
        super('body', ['email', 'password', 'phone_number', 'first_name', 'last_name'], new services_1.AuthUserService(), 200, 'OK');
    }
    async login(req, res, next) {
        const response = await this.exec(req, next);
        console.log(response);
        this.pushResponse(response, next);
    }
}
exports.default = new AuthUser();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
class Extras {
    returnNumberOREmail_(email, phone_number) {
        if (email && phone_number) {
            throw new AppError_1.default('Provide either phone number or email address', 400);
        }
        return email || phone_number;
    }
    async checkCredentialNotVerified_(param, data) {
        if (data[`${param}_verified`]) {
            throw new AppError_1.default(`${param} already verified`, 401);
        }
    }
    async checkCredentialVerified_(param, data) {
        if (!data[`${param}_verified`]) {
            throw new AppError_1.default(`${param} not verified`, 401);
        }
    }
}
exports.default = Extras;

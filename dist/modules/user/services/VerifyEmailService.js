"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class VerifyUserPhoneService extends BaseService_1.default {
    async execute(data) {
        const userDetails = await this.getUser('email', data.email);
        await this.throwCredVerified('email', userDetails);
        await this.getAndValidateOtp(`verify_email.${data.email}`, data.otp);
        this.updateUser({ email_verified: true }, userDetails);
    }
}
exports.default = VerifyUserPhoneService;

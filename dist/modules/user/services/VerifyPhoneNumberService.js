"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class VerifyUserPhoneService extends BaseService_1.default {
    async execute(data) {
        const userDetails = await this.getUser('phone_number', data.phone_number);
        this.throwCredVerified('phone_number', userDetails);
        await this.getAndValidateOtp(`verify_phone_number.${data.phone_number}`, data.otp);
        this.updateUser({ phone_number_verified: true }, userDetails);
    }
}
exports.default = VerifyUserPhoneService;

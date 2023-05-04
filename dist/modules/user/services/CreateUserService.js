"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class CreateUserService extends BaseService_1.default {
    async execute(data) {
        this.credentialTaken('email', data.email);
        this.credentialTaken('phone_number', data.phone_number);
        data.password = await this.hashPassword(data.password);
        this.userRepository.create(data);
        const otpId = this.cacheOtp(`verify_email.${data.phone_number}`);
        this.sendOtpEmailOrSms('verifyEmail', data.email);
        return { email: data.email, otp_id: otpId };
    }
}
exports.default = CreateUserService;

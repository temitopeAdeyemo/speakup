"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/Helpers/BaseService"));
class GetPhoneOtpService extends BaseService_1.default {
    async execute(data) {
        const user = await this.getUser('email', data.email);
        this.throwCredVerified('email', user);
        this.cacheOtp(`verify_email.${data.email}`, this.generatedOtp);
        this.sendOtpMail('verifyEmail', data.email, this.generatedOtp);
        return { otp: this.generatedOtp };
    }
}
exports.default = GetPhoneOtpService;

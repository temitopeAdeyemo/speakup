"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/Helpers/BaseService"));
class CreateUserService extends BaseService_1.default {
    async execute(data) {
        this.throwCredTaken('email', data.email);
        this.throwCredTaken('phone_number', data.phone_number);
        data.password = await this.hashPassword(data.password);
        this.createUser(data);
        const otpId = this.cacheOtp(`$verify_phone_number.${data.phone_number}`, this.generatedOtp);
        this.sendOtpSms('verifyPhone', data.phone_number, this.generatedOtp);
        return { email: data.email, otp_id: otpId };
    }
}
exports.default = CreateUserService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/Helpers/BaseService"));
class GetPhoneOtpService extends BaseService_1.default {
    async execute(data) {
        const user = await this.getUser('phone_number', data.phone_number);
        await this.throwCredVerified('phone_number', user);
        this.cacheOtp(data.phone_number, this.generatedOtp);
        this.sendOtpSms('verifyPhone', data.phone_number, this.generatedOtp);
    }
}
exports.default = GetPhoneOtpService;

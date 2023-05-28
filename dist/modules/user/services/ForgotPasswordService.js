"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("../../../shared/Helpers/BaseService"));
class ForgotPasswordService extends BaseService_1.default {
    async execute(data) {
        const user = this.returnNumberOREmail(data.email, data.phone_number);
        await this.getUserByPhoneOREmail(data.email, data.phone_number);
        const otpId = this.cacheOtp(`reset_pass.${user}`, this.generatedOtp);
        this.sendOtpEmailOrSms('passReset', this.generatedOtp, data.email);
        return { otp_id: otpId };
    }
}
exports.default = ForgotPasswordService;

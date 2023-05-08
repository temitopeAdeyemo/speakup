"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = __importDefault(require("../../shared/services/EmailService"));
const SendSMS_1 = __importDefault(require("../../shared/services/SendSMS"));
class EmailSmsHelper {
    constructor() {
        this.emailService = new EmailService_1.default();
        this.smsService = new SendSMS_1.default();
    }
    async sendOtpMail_(type, email, otp) {
        let option = {};
        option[type] = true;
        if (email)
            await this.emailService.sendOTP([email], otp, option);
    }
    async sendOtpSms_(type, phone_number, otp) {
        await this.smsService.sendOtp(type, phone_number, otp);
    }
    sendOtpEmailOrSms_(type, otp, email, phone_number) {
        if (email)
            return this.sendOtpMail_(type, email, otp);
        else if (phone_number)
            return this.sendOtpSms_(type, phone_number, otp);
    }
}
exports.default = EmailSmsHelper;

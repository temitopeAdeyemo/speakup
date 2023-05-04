"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
class ResetPasswordService extends BaseService_1.default {
    async execute(data) {
        const user = this.returnNumberOREmail(data.email, data.phone_number);
        const userDetails = await this.getUserByPhoneOREmail();
        await this.getAndValidateOtp(`reset_pass.${user}`, data.otp);
        await this.hashAndUpdatePassword(data.new_password, userDetails);
        this.deleteCachedOtp(`reset_pass.${user}`);
    }
}
exports.default = ResetPasswordService;

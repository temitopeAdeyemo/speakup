"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const Redis_1 = __importDefault(require("../services/Redis"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
class OTPHelper {
    constructor() {
        this.cache = Redis_1.default;
    }
    cacheOtp_(key, otp) {
        this.cache.set(key, otp, environments_config_1.default.otpExpiresin);
        return key;
    }
    async getAndValidateOtp_(key, otp) {
        const cachedOtp = await this.cache.get(key);
        if (!cachedOtp) {
            throw new AppError_1.default('Invalid otp or otp expired.', 403);
        }
        if (cachedOtp != otp) {
            throw new AppError_1.default('Otp do not match.', 403);
        }
    }
    async deleteCachedOtp_(key) {
        this.cache.delete(key);
    }
    async getCachedOtp_(key) {
        return await this.cache.get(key);
    }
}
exports.default = OTPHelper;

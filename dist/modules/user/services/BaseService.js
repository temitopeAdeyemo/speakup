"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt_1 = __importDefault(require("../../../shared/services/Bcrypt"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const UserRepository_1 = __importDefault(require("../models/repositories/UserRepository"));
const utils_1 = require("../../../shared/utils");
const EmailService_1 = __importDefault(require("../../../shared/services/EmailService"));
const Redis_1 = __importDefault(require("../../../shared/services/Redis"));
const uuid = __importStar(require("uuid"));
const JWT_1 = __importDefault(require("../../../shared/services/JWT"));
const SendSMS_1 = __importDefault(require("../../../shared/services/SendSMS"));
const environments_config_1 = __importDefault(require("../../../config/environments.config"));
class BaseService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.bcrypt = new Bcrypt_1.default();
        this.jwtClient = new JWT_1.default();
        this.emailService = new EmailService_1.default();
        this.smsService = new SendSMS_1.default();
        this.cache = new Redis_1.default();
        this.generatedOTP = (0, utils_1.generateOTP)();
        this.uuid = uuid.v4();
        this.otp = this.generatedOTP; // Be careful as this otp is used when you call this.otp
    }
    async credentialTaken(credential, value) {
        const userExists = await this.userRepository.findByPhoneOrEmail(credential, value);
        if (userExists) {
            throw new AppError_1.default(`${credential} taken.`, 400);
        }
    }
    async getUser(credential, value) {
        const user = await this.userRepository.findByPhoneOrEmail(credential, value);
        if (!user) {
            throw new AppError_1.default(`Invalid Credentials.`, 401);
        }
        return user;
    }
    async sendOtpMail(type, email) {
        let option = {};
        option[type] = true;
        if (email)
            await this.emailService.sendOTP([email], this.otp, option);
    }
    async sendOtpSms(type, phone_number) {
        await this.smsService.sendOtp(type, phone_number, this.otp);
    }
    async hashPassword(Password) {
        return await this.bcrypt.hash(Password);
    }
    cacheOtp(key) {
        this.cache.set(key, this.otp, environments_config_1.default.otpExpiresin);
        return key;
    }
    async checkPassword(password, hash) {
        const passwordMatch = await this.bcrypt.compare(password, hash);
        if (!passwordMatch) {
            throw new AppError_1.default('Invalid Credentials.', 401);
        }
    }
    returnNumberOREmail(email, phone_number) {
        if (email && phone_number) {
            throw new AppError_1.default('Provide either phone number or email address', 400);
        }
        return email || phone_number;
    }
    sendOtpEmailOrSms(type, email, phone_number) {
        if (email)
            return this.sendOtpMail(type, email);
        else if (phone_number)
            return this.sendOtpSms(type, phone_number);
    }
    getUserByPhoneOREmail(email, phone_number) {
        if (email)
            return this.getUser('email', email);
        else if (phone_number)
            return this.getUser('phone_number', phone_number);
    }
    async checkCredentialNotVerified(param, data) {
        if (data[`${param}_verified`]) {
            throw new AppError_1.default(`${param} already verified`, 401);
        }
    }
    async checkCredentialVerified(param, data) {
        if (!data[`${param}_verified`]) {
            throw new AppError_1.default(`${param} not verified`, 401);
        }
    }
    async getAndValidateOtp(key, otp) {
        const cachedOtp = await this.cache.get(key);
        if (!cachedOtp) {
            throw new AppError_1.default('Invalid otp or otp expired.', 403);
        }
        if (cachedOtp != otp) {
            throw new AppError_1.default('Otp do not match.', 403);
        }
    }
    async updateUser(data, user) {
        user = { ...user, ...data };
        await this.userRepository.save(user);
    }
    async hashAndUpdatePassword(newPassword, user) {
        if (!user) {
            throw new AppError_1.default('User not found', 401);
        }
        newPassword = await this.hashPassword(newPassword);
        return await this.updateUser({ password: newPassword }, user);
    }
    async deleteCachedOtp(key) {
        this.cache.delete(key);
    }
    async getCachedOtp(key) {
        return await this.cache.get(key);
    }
}
exports.default = BaseService;

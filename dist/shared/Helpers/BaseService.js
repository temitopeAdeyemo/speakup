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
const utils_1 = require("../utils");
const uuid = __importStar(require("uuid"));
const DbRepoHelper_1 = __importDefault(require("./DbRepoHelper"));
const EmailSmsHelper_1 = __importDefault(require("./EmailSmsHelper"));
const OtpHelper_1 = __importDefault(require("./OtpHelper"));
const PasswordHelpers_1 = __importDefault(require("./PasswordHelpers"));
const ExtraHelpers_1 = __importDefault(require("./ExtraHelpers"));
// import UserRepository from '../../modules/user/models/repositories/UserRepository';
const JWT_1 = __importDefault(require("../services/JWT"));
class BaseService {
    constructor() {
        this.dbRepoHelper = new DbRepoHelper_1.default();
        this.emailSmsHelper = new EmailSmsHelper_1.default();
        this.otpHelper = new OtpHelper_1.default();
        this.passwordHelpers = new PasswordHelpers_1.default();
        this.extraHelpers = new ExtraHelpers_1.default();
        this.jwtClient = new JWT_1.default();
        /**
         * This property returns a generated otp
         */
        this.generateOTP = (0, utils_1.generateOTP)();
        /**
         * This property returns a generated uuid number
         */
        this.uuid = uuid.v4();
        /**
         * This property creates a user when called.
         */
        this.createUser = this.dbRepoHelper.createUser_.bind(this.dbRepoHelper);
        // protected updateAccInfo = this.dbRepoHelper.updateAccInfo_;
        this.throwCredTaken = this.dbRepoHelper.credentialTaken_.bind(this.dbRepoHelper);
        this.getUser = this.dbRepoHelper.getUser_.bind(this.dbRepoHelper);
        this.sendOtpMail = this.emailSmsHelper.sendOtpMail_.bind(this.emailSmsHelper);
        this.hashPassword = this.passwordHelpers.hashPassword_.bind(this.passwordHelpers);
        this.checkPassword = this.passwordHelpers.checkPassword_.bind(this.passwordHelpers);
        this.cacheOtp = this.otpHelper.cacheOtp_.bind(this.otpHelper);
        this.generatedOtp = this.generateOTP;
        this.sendOtpSms = this.emailSmsHelper.sendOtpSms_.bind(this.emailSmsHelper);
        this.returnNumberOREmail = this.extraHelpers.returnNumberOREmail_.bind(this.extraHelpers);
        this.sendOtpEmailOrSms = this.emailSmsHelper.sendOtpEmailOrSms_.bind(this.emailSmsHelper);
        this.getUserByPhoneOREmail = this.dbRepoHelper.getUserByPhoneOREmail_.bind(this.dbRepoHelper);
        this.throwCredVerified = this.extraHelpers.checkCredentialNotVerified_.bind(this.extraHelpers);
        this.throwCredNotVerified = this.extraHelpers.checkCredentialVerified_.bind(this.extraHelpers);
        this.getAndValidateOtp = this.otpHelper.getAndValidateOtp_.bind(this.otpHelper);
        this.updateUser = this.dbRepoHelper.updateUser_.bind(this.dbRepoHelper);
        this.hashAndUpdatePassword = this.passwordHelpers.hashAndUpdatePassword_.bind(this.passwordHelpers);
        this.deleteCachedOtp = this.otpHelper.deleteCachedOtp_.bind(this.otpHelper);
        this.getCachedOtp = this.otpHelper.getCachedOtp_.bind(this.otpHelper);
    }
}
exports.default = BaseService;

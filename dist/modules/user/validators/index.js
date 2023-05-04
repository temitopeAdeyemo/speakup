"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordValidator = exports.resetPasswordValidator = exports.GetPhoneOtpValidator = exports.VerifyPhoneValidator = exports.registerValidator = exports.loginValidator = void 0;
const loginValidator_1 = __importDefault(require("./loginValidator"));
exports.loginValidator = loginValidator_1.default;
const registerValidator_1 = __importDefault(require("./registerValidator"));
exports.registerValidator = registerValidator_1.default;
const verifyPhoneValidator_1 = __importDefault(require("./verifyPhoneValidator"));
exports.VerifyPhoneValidator = verifyPhoneValidator_1.default;
const getPhoneOtpValidator_1 = __importDefault(require("./getPhoneOtpValidator"));
exports.GetPhoneOtpValidator = getPhoneOtpValidator_1.default;
const ResetPasswordValidator_1 = __importDefault(require("./ResetPasswordValidator"));
exports.resetPasswordValidator = ResetPasswordValidator_1.default;
const forgotPasswordValidator_1 = __importDefault(require("./forgotPasswordValidator"));
exports.ForgotPasswordValidator = forgotPasswordValidator_1.default;

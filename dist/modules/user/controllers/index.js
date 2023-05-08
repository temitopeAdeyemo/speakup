"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = exports.ResetPasswordController = exports.GetPhoneOtpController = exports.VerifyPhoneController = exports.AuthUser = exports.CreateUser = void 0;
const Create_controller_1 = __importDefault(require("./Create.controller"));
exports.CreateUser = Create_controller_1.default;
const Auth_controller_1 = __importDefault(require("./Auth.controller"));
exports.AuthUser = Auth_controller_1.default;
const VerifyPhone_controller_1 = __importDefault(require("./VerifyPhone.controller"));
exports.VerifyPhoneController = VerifyPhone_controller_1.default;
const GetPhoneOtp_controller_1 = __importDefault(require("./GetPhoneOtp.controller"));
exports.GetPhoneOtpController = GetPhoneOtp_controller_1.default;
const ResetPassword_controller_1 = __importDefault(require("./ResetPassword.controller"));
exports.ResetPasswordController = ResetPassword_controller_1.default;
const ForgotPassword_controller_1 = __importDefault(require("./ForgotPassword.controller"));
exports.ForgotPasswordController = ForgotPassword_controller_1.default;

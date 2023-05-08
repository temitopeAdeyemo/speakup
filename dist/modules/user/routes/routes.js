"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators/");
const router = (0, express_1.Router)();
router.post('/register', validators_1.registerValidator, controllers_1.CreateUser.register.bind(controllers_1.CreateUser));
router.post('/login', validators_1.loginValidator, controllers_1.AuthUser.login.bind(controllers_1.AuthUser));
router.patch('/verify', validators_1.VerifyPhoneValidator, controllers_1.VerifyPhoneController.verify.bind(controllers_1.VerifyPhoneController));
router.post('/verify', validators_1.GetPhoneOtpValidator, controllers_1.GetPhoneOtpController.getOtp.bind(controllers_1.GetPhoneOtpController));
router.patch('/reset-password', validators_1.resetPasswordValidator, controllers_1.ResetPasswordController.reset.bind(controllers_1.ResetPasswordController));
router.patch('/forgot-password', validators_1.ForgotPasswordValidator, controllers_1.ForgotPasswordController.getOtp.bind(controllers_1.ForgotPasswordController));
exports.default = router;

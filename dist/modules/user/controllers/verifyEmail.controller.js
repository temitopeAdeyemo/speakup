"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class EmailVerification {
    async verify(req, res, next) {
        const { email, otp } = req.body;
        const response = await new services_1.VerifyEmailService().execute({
            email,
            otp,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'Email Verified successfully', response);
        next(successResponse);
    }
}
exports.default = new EmailVerification();

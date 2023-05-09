"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetEmailOtpController {
    async getOtp(req, res, next) {
        const { email } = req.body;
        const response = await new services_1.GetEmailOtpService().execute({
            email,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'Otp sent successfully.', response);
        next(successResponse);
    }
}
exports.default = new GetEmailOtpController();

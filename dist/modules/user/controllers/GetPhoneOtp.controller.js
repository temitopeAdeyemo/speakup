"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class GetPhoneOtpController {
    async getOtp(req, res, next) {
        const { phone_number } = req.body;
        const response = await new services_1.GetPhoneOtpService().execute({
            phone_number,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new GetPhoneOtpController();

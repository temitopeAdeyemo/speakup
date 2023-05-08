"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class PhoneVerification {
    async verify(req, res, next) {
        const { phone_number, otp } = req.body;
        const response = await new services_1.VerifyUserPhoneService().execute({
            phone_number,
            otp,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'User Verified successfully', response);
        next(successResponse);
    }
}
exports.default = new PhoneVerification();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class ResetPasswordController {
    async reset(req, res, next) {
        const { phone_number, email, otp, new_password } = req.body;
        const response = await new services_1.ResetPasswordService().execute({
            new_password,
            phone_number,
            email,
            otp,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(200, 'User Verified successfully', response);
        next(successResponse);
    }
}
exports.default = new ResetPasswordController();

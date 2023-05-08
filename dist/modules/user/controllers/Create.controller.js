"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const services_1 = require("../services");
class CreateUser {
    async register(req, res, next) {
        const { first_name, last_name, email, password, phone_number } = req.body;
        const response = await new services_1.CreateUserService().execute({
            first_name,
            last_name,
            email,
            password,
            phone_number,
        });
        const successResponse = AppSuccess_1.jsonResponse.build(201, 'User created successfully', response);
        next(successResponse);
    }
}
exports.default = new CreateUser();

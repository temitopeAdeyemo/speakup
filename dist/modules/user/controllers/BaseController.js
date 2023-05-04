"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = require("../../../shared/utils/AppSuccess");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
class BaseController {
    constructor(paramType, paramKeys, Service, statusCode, message) {
        this.Service = Service;
        this.paramKeys = paramKeys;
        this.paramType = paramType;
        this.statusCode = statusCode;
        this.message = message;
    }
    async exec(req, next) {
        try {
            let serviceArgs = null;
            if (this.paramType) {
                serviceArgs = {};
                this.paramKeys.forEach((key) => {
                    serviceArgs[key] = req.body[key];
                });
            }
            const response = await this.Service.execute(serviceArgs);
            return response;
        }
        catch (error) {
            throw new AppError_1.default(error.message, error.statusCode);
        }
    }
    pushResponse(response, next) {
        try {
            const successResponse = AppSuccess_1.jsonResponse.build(this.statusCode, this.message, response);
            next(successResponse);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = BaseController;

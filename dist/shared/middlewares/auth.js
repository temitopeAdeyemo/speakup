"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = __importDefault(require("../../shared/services/JWT"));
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const UserRepository_1 = __importDefault(require("../../modules/user/models/repositories/UserRepository"));
const auth = async (request, response, next) => {
    let token = request.headers['authorization'];
    if (!token) {
        throw new AppError_1.default('No token provided', 401);
    }
    token = token.replace('Bearer ', '');
    const { id } = new JWT_1.default().verifyAccessToken(token);
    const userRepository = new UserRepository_1.default();
    const user = await userRepository.findById(id);
    if (!user) {
        throw new AppError_1.default('No user token', 401);
    }
    if (!user.phone_number_verified) {
        throw new AppError_1.default('Please verify your phone number to continue.', 401);
    }
    request.user = id;
    return next();
};
exports.default = auth;

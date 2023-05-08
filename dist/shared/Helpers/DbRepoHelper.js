"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const UserRepository_1 = __importDefault(require("../../modules/user/models/repositories/UserRepository"));
class DbRepoHelper {
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    async createUser_(data) {
        await this.userRepository.create(data);
    }
    async credentialTaken_(credential, value) {
        const userExists = await this.userRepository.findByPhoneOrEmail(credential, value);
        if (userExists) {
            throw new AppError_1.default(`${credential} taken.`, 400);
        }
    }
    async getUser_(credential, value) {
        const user = await this.userRepository.findByPhoneOrEmail(credential, value);
        if (!user) {
            throw new AppError_1.default(`Invalid Credentials.`, 401);
        }
        return user;
    }
    getUserByPhoneOREmail_(email, phone_number) {
        if (email)
            return this.getUser_('email', email);
        else if (phone_number)
            return this.getUser_('phone_number', phone_number);
    }
    async updateUser_(data, user) {
        user = { ...user, ...data };
        await this.userRepository.save(user);
    }
}
exports.default = DbRepoHelper;

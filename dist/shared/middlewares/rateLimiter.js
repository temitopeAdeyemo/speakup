"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const AppError_1 = __importDefault(require("../utils/AppError"));
const limiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 10,
    duration: 5,
});
async function rateLimiter(request, response, next) {
    try {
        await limiter.consume(request.ip);
        return next();
    }
    catch (error) {
        throw new AppError_1.default(`Too many requests, Please try again later.`, 429);
    }
}
exports.default = rateLimiter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = require("axios");
const AppError_1 = __importDefault(require("../utils/AppError"));
const multer_1 = require("multer");
function errorHandler(error, request, response, _) {
    console.log(44444444, error);
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
    if (error instanceof celebrate_1.CelebrateError) {
        const bodyMessage = error.details.get('body')?.message;
        const queryMessage = error.details.get('query')?.message;
        const paramsMessage = error.details.get('params')?.message;
        return response.status(400).json({
            success: false,
            message: bodyMessage || queryMessage || paramsMessage,
            data: null,
        });
    }
    if (error instanceof axios_1.AxiosError) {
        return response.status(error.response?.status || 502).json({
            success: false,
            message: error.message || 'UPSTREAM_SERVER_ERROR',
            data: error.response?.data || null,
        });
    }
    if (error instanceof multer_1.MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
        return response.status(400).json({
            success: false,
            message: `${error.message} ${error.field}, max image uploads allowed are 2.`,
            data: null,
        });
    }
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        return response.status(401).json({
            success: false,
            message: 'Token expired',
            data: null,
        });
    }
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        return response.status(401).json({
            success: false,
            message: 'Token invalid',
            data: null,
        });
    }
    return response.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null,
    });
}
exports.default = errorHandler;

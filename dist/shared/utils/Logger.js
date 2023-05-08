"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = exports.systemLogs = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, prettyPrint } = winston_1.format;
const fileRotateTransport = new winston_1.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});
exports.systemLogs = (0, winston_1.createLogger)({
    level: 'http',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }), prettyPrint()),
    transports: [
        fileRotateTransport,
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
    exceptionHandlers: [new winston_1.transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new winston_1.transports.File({ filename: 'logs/rejections.log' })],
});
exports.morganMiddleware = (0, morgan_1.default)(function (tokens, req, res) {
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number(tokens.status(req, res)),
        content_length: Number(tokens.res(req, res, 'content-length')),
        response_time: Number(tokens['response-time'](req, res)),
    });
}, {
    stream: {
        write: (message) => {
            const data = JSON.parse(message);
            exports.systemLogs.http(`incoming-request`, data);
        },
    },
});

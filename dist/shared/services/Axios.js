"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Axios {
    constructor() {
        this.axios = axios_1.default;
    }
    async get(url, authorization) {
        const config = {
            url,
            method: 'get',
            headers: {
                Authorization: authorization,
                'content-type': 'application/json',
            },
        };
        console.log('url', url);
        const response = await (0, axios_1.default)(config);
        return response.data;
    }
    async post(url, payload, authorization, token) {
        const config = {
            url,
            method: 'post',
            headers: {
                token,
                Authorization: authorization,
                'content-type': 'application/json',
            },
            data: payload,
        };
        const response = await (0, axios_1.default)(config);
        return response.data;
    }
}
exports.default = Axios;

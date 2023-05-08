"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = void 0;
class JsonResponse {
    build(statusCode, message, data = null) {
        this.data = { success: true, message, data };
        this.statusCode = statusCode;
        return this;
    }
}
exports.default = JsonResponse;
exports.jsonResponse = new JsonResponse();

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reach360Client = void 0;
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const url_1 = require("url");
const types_1 = require("./types");
class Reach360Client {
    config;
    constructor(config) {
        this.config = config;
    }
    async makeRequest(options) {
        const { method, endpoint, params, body } = options;
        // Build URL with query parameters
        const url = new url_1.URL(`${this.config.baseUrl}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }
        // Prepare headers
        const headers = {
            "Authorization": `Bearer ${this.config.apiKey}`,
            "API-Version": this.config.apiVersion,
            "Content-Type": "application/json",
        };
        // Prepare request body
        const requestBody = body ? JSON.stringify(body) : undefined;
        if (requestBody) {
            headers["Content-Length"] = Buffer.byteLength(requestBody).toString();
        }
        // Make request using Node.js built-in HTTP(S) module
        const isHttps = url.protocol === 'https:';
        const httpModule = isHttps ? https : http;
        return new Promise((resolve, reject) => {
            const req = httpModule.request(url, {
                method,
                headers,
            }, (res) => {
                let responseText = '';
                res.on('data', (chunk) => {
                    responseText += chunk;
                });
                res.on('end', () => {
                    let responseData;
                    try {
                        responseData = responseText ? JSON.parse(responseText) : {};
                    }
                    catch (e) {
                        reject(new Error(`Invalid JSON response: ${responseText}`));
                        return;
                    }
                    if (!res.statusCode || res.statusCode >= 400) {
                        // Try to parse as error response
                        const errorResult = types_1.ErrorResponseSchema.safeParse(responseData);
                        if (errorResult.success) {
                            const errors = errorResult.data.errors.map(e => `${e.code}: ${e.message}`).join(", ");
                            reject(new Error(`API Error (${res.statusCode}): ${errors}`));
                        }
                        else {
                            reject(new Error(`HTTP Error ${res.statusCode}: ${responseText}`));
                        }
                        return;
                    }
                    resolve(responseData);
                });
            });
            req.on('error', (error) => {
                reject(new Error(`Request failed: ${error.message}`));
            });
            if (requestBody) {
                req.write(requestBody);
            }
            req.end();
        });
    }
    async get(endpoint, params) {
        return this.makeRequest({
            method: "GET",
            endpoint,
            params,
        });
    }
    async post(endpoint, body, params) {
        return this.makeRequest({
            method: "POST",
            endpoint,
            body,
            params,
        });
    }
    async put(endpoint, body, params) {
        return this.makeRequest({
            method: "PUT",
            endpoint,
            body,
            params,
        });
    }
    async delete(endpoint, params) {
        return this.makeRequest({
            method: "DELETE",
            endpoint,
            params,
        });
    }
}
exports.Reach360Client = Reach360Client;
//# sourceMappingURL=client.js.map
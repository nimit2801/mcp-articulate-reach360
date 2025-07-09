"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const types_1 = require("./types");
function getConfig() {
    const apiKey = process.env.REACH360_API_KEY;
    const region = process.env.REACH360_REGION || "us";
    if (!apiKey) {
        throw new Error("REACH360_API_KEY environment variable is required");
    }
    // Determine base URL based on region
    const baseUrl = region.toLowerCase() === "eu"
        ? "https://api.reach360.eu"
        : "https://api.reach360.com";
    const config = {
        apiKey,
        baseUrl,
        apiVersion: process.env.REACH360_API_VERSION || "2023-04-04",
    };
    return types_1.ConfigSchema.parse(config);
}
exports.config = getConfig();
//# sourceMappingURL=config.js.map
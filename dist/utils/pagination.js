"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationParams = buildPaginationParams;
exports.extractCursorFromUrl = extractCursorFromUrl;
function buildPaginationParams(input) {
    const params = {};
    if (input.limit) {
        params.limit = input.limit;
    }
    if (input.cursor) {
        // If we have a cursor, it means we're requesting a specific page
        // The cursor should contain the full URL for the next page
        // For simplicity, we'll assume the cursor is just passed through
        // In a real implementation, you might need to parse the nextUrl
        params.cursor = input.cursor;
    }
    return params;
}
function extractCursorFromUrl(url) {
    if (!url)
        return null;
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('cursor');
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=pagination.js.map
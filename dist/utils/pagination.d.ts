export interface PaginationInput {
    limit?: number;
    cursor?: string;
}
export declare function buildPaginationParams(input: PaginationInput): Record<string, string | number>;
export declare function extractCursorFromUrl(url: string | null): string | null;
//# sourceMappingURL=pagination.d.ts.map
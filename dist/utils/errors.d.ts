export declare function handleError(error: unknown): {
    content: {
        type: "text";
        text: string;
    }[];
    isError: boolean;
};
export declare class Reach360Error extends Error {
    code?: string | undefined;
    statusCode?: number | undefined;
    constructor(message: string, code?: string | undefined, statusCode?: number | undefined);
}
//# sourceMappingURL=errors.d.ts.map
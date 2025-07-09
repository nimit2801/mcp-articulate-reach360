import { Config, type ApiRequestOptions } from "./types";
export declare class Reach360Client {
    private config;
    constructor(config: Config);
    makeRequest<T>(options: ApiRequestOptions): Promise<T>;
    get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T>;
    post<T>(endpoint: string, body?: any, params?: Record<string, string | number>): Promise<T>;
    put<T>(endpoint: string, body?: any, params?: Record<string, string | number>): Promise<T>;
    delete<T>(endpoint: string, params?: Record<string, string | number>): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map
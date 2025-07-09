import { Reach360Client } from "../client";
export declare class ResourceProvider {
    private client;
    constructor(client: Reach360Client);
    listResources(): Promise<{
        resources: {
            uri: string;
            name: string;
            description: string;
            mimeType: string;
        }[];
    }>;
    readResource(uri: string): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=index.d.ts.map